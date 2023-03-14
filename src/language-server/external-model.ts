import { AstNode } from 'langium';
import { LocationLink } from 'vscode-languageclient';

export interface ExternalModelData {
    fqn: string
    location: LocationLink
}
export interface ExternalModel {
    isReferenceValid(url: string, fqn: string): boolean;
    getAllData(url: string): Array<ExternalModelData>
    getData(url: string, fqn: string): ExternalModelData;
}

export abstract class ExternalModelBaseImpl implements ExternalModel {
    data = new Map<string, Map<string, ExternalModelData>>();


    isReferenceValid(url: string, fqn: string): boolean {
        this.loadModelInternal(url);
        const model = this.data.get(url);
        if (model===undefined) return false;
        const result = model.get(fqn);
        return (result!==undefined);
    }

    getAllData(url: string): ExternalModelData[] {
        this.loadModelInternal(url);
        const result = this.data.get(url);
        if (result===undefined) throw new Error(`unexpected, no data found for ${url}`);
        return Array.from(result.values());
    }
    
    getData(url: string, fqn: string): ExternalModelData {
        this.loadModelInternal(url);
        const model = this.data.get(url);
        if (model===undefined) throw new Error(`${url} not an external model`);
        const result = model.get(fqn);
        if (result===undefined) throw new Error(`${fqn} not in external model ${url}`);
        return result;
    }
    private loadModelInternal(url: string): void {
        const m = new Map<string, ExternalModelData>();
        this.loadModel(url).forEach(v=>{
            m.set(v.fqn, v);
        });
        this.data.set(url, m);
    }

    abstract getReferenceUrlAndFqn(astNode: AstNode|undefined): {url:string, fqn:string}|undefined;

    abstract loadModel(url: string): ExternalModelData[];
};
