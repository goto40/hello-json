/******************************************************************************
 * This file was generated by langium-cli 1.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import { AstNode, AbstractAstReflection, Reference, ReferenceInfo, TypeMetaData } from 'langium';

export type FQN = string;

export interface JsonInclude extends AstNode {
    readonly $container: Model;
    readonly $type: 'JsonInclude';
    filename: string
    name: string
}

export const JsonInclude = 'JsonInclude';

export function isJsonInclude(item: unknown): item is JsonInclude {
    return reflection.isInstance(item, JsonInclude);
}

export interface JsonReference extends AstNode {
    readonly $container: Model;
    readonly $type: 'JsonReference';
    include: Reference<JsonInclude>
    jsonLink: FQN
}

export const JsonReference = 'JsonReference';

export function isJsonReference(item: unknown): item is JsonReference {
    return reflection.isInstance(item, JsonReference);
}

export interface Model extends AstNode {
    readonly $type: 'Model';
    includes: Array<JsonInclude>
    jsonReferences: Array<JsonReference>
}

export const Model = 'Model';

export function isModel(item: unknown): item is Model {
    return reflection.isInstance(item, Model);
}

export interface HelloJsonAstType {
    JsonInclude: JsonInclude
    JsonReference: JsonReference
    Model: Model
}

export class HelloJsonAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['JsonInclude', 'JsonReference', 'Model'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'JsonReference:include': {
                return JsonInclude;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'Model': {
                return {
                    name: 'Model',
                    mandatory: [
                        { name: 'includes', type: 'array' },
                        { name: 'jsonReferences', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new HelloJsonAstReflection();
