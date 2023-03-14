import { ValidationAcceptor, ValidationChecks } from 'langium';
import { HelloJsonAstType, JsonReference } from './generated/ast';
import type { HelloJsonServices } from './hello-json-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloJsonServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloJsonValidator;
    const checks: ValidationChecks<HelloJsonAstType> = {
        JsonReference: validator.checkJsonReference
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloJsonValidator {

    constructor(private services: HelloJsonServices) {}

    checkJsonReference(r: JsonReference, accept: ValidationAcceptor): void {
        const externalModel = this.services.external.HelloJsonExternalJsonModel;
        const include = r.include?.ref;

        if (include){
            const url = new URL(include.filename, include.$container.$document?.uri.toString()).toString();
            if (!externalModel.isReferenceValid(url, r.jsonLink)) {
                accept('error', `unresolved ${r.jsonLink}`, {node: r, property: 'jsonLink'});
            }
        } 
    }

}
