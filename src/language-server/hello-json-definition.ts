import { CstNode, DefaultDefinitionProvider } from "langium";
import { DefinitionParams, LocationLink } from "vscode-languageclient";
import { HelloJsonServices } from "./hello-json-module";

export class HelloJsonDefinitionProvider extends DefaultDefinitionProvider {

    constructor(private services: HelloJsonServices) {
        super(services);
    }

    protected override async collectLocationLinks(sourceCstNode: CstNode, params: DefinitionParams): Promise<LocationLink[] | undefined> {
        const externalModel = this.services.external.HelloJsonExternalJsonModel;

        const result = await super.collectLocationLinks(sourceCstNode, params);
        if (result===undefined) {
            const ref = externalModel.getReferenceUrlAndFqn(sourceCstNode.element);
            if (ref!==undefined) {
                return [externalModel.getData(ref.url,ref.fqn).location];
            }
        }
        return result;
    }

}