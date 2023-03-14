import { ValidationAcceptor, ValidationChecks } from 'langium';
import { HelloGrammarAstType, Person } from './generated/ast';
import type { HelloGrammarServices } from './hello-grammar-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloGrammarServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloGrammarValidator;
    const checks: ValidationChecks<HelloGrammarAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloGrammarValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
