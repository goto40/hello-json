import * as fs from 'fs'
import { JSONPath, visit } from 'jsonc-parser';
import { AstNode } from 'langium';
import { ExternalModelBaseImpl, ExternalModelData } from "./external-model";
import { isJsonReference } from './generated/ast';

export class HelloJsonExternalJsonModel extends ExternalModelBaseImpl {

    override getReferenceUrlAndFqn(astNode: AstNode|undefined): { url: string; fqn: string; } | undefined {
        if (isJsonReference(astNode)) {
            const include = astNode.include.ref;
            //console.log(`preparing goto "${sourceCstNode.element.jsonLink}"`);            
            if (include!==undefined) {
                const url = new URL(include.filename, include.$container.$document?.uri.toString()).toString();
                //console.log(`-> goto "${sourceCstNode.element.jsonLink}/${url}"`);
                return {url:url, fqn:astNode.jsonLink};
            }
        }
        return undefined;
    }

    override loadModel(url: string): ExternalModelData[] {
        const fileName = new URL(url).pathname;
        const elements = new Array<ExternalModelData>;

        let current: string|undefined|number;
        const names = new Array<string|number>;
        function onObjectProperty(property: string, offset: number, length: number, startLine: number, startCharacter: number, pathSupplier: () => JSONPath): void {
            current=property;
        };
        function onObjectBegin(offset: number, length: number, startLine: number, startCharacter: number, pathSupplier: () => JSONPath): void {
            if (current!==undefined) {                
                names.push(current);
                current=undefined;    
            }
        };
        function onObjectEnd(offset: number, length: number, startLine: number, startCharacter: number): void {
            current = names.pop();
            if (typeof current === 'number') current++;
        };
        function onArrayBegin(offset: number, length: number, startLine: number, startCharacter: number, pathSupplier: () => JSONPath): void {
            if (current!==undefined) {
                names.push(current);
                current=0;
            }
        }
        function onArrayEnd(offset: number, length: number, startLine: number, startCharacter: number): void {
            current = names.pop();
        }

        function onLiteralValue(value: any, offset: number, length: number, startLine: number, startCharacter: number, pathSupplier: () => JSONPath): void {
            function f(x:string|number) {
                if (typeof x === 'number') return `_${x}`;
                else return x;
            }
            const fqn = `${names.map(f).join('.')}${names.length>0?'.':''}${current}`;
            elements.push({
                fqn: fqn,
                location: {
                    targetUri: url,
                    targetRange: {start:{line:startLine,character:startCharacter},end:{line:startLine,character:startCharacter}},
                    targetSelectionRange: {start:{line:startLine,character:startCharacter},end:{line:startLine,character:startCharacter}}
                }
            });        
        }
        visit(fs.readFileSync(fileName, 'utf-8'), {
            onObjectBegin: onObjectBegin,
            onObjectEnd: onObjectEnd,
            onArrayBegin: onArrayBegin,
            onArrayEnd: onArrayEnd,
            onObjectProperty: onObjectProperty,
            onLiteralValue:onLiteralValue
        });

        return elements;
    }
}
