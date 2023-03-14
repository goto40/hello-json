import { CompletionAcceptor, CompletionContext, DefaultCompletionProvider, MaybePromise, NextFeature } from "langium";
import { HelloJsonServices } from "./hello-json-module";

export class HelloJsonCompletionProvider extends DefaultCompletionProvider {

    constructor(public services: HelloJsonServices) {
        super(services);
    }

    protected override completionFor(context: CompletionContext, next: NextFeature, acceptor: CompletionAcceptor): MaybePromise<void> {
        const externalModel = this.services.external.HelloJsonExternalJsonModel;

        const ref = externalModel.getReferenceUrlAndFqn(context.node);
        if (ref!==undefined && next.feature.$containerProperty==='elements') {
            const url = ref.url;
            const completionValues = externalModel.getAllData(url);
            completionValues.forEach(v=>{
                acceptor({detail: v.fqn, kind: 1, label: v.fqn});
            })
        }
        return super.completionFor(context, next, acceptor);
    }
}