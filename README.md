# Hello-JSON: a demo how to integrate an external model into a langium DSL

## Abstract

The **goal** is create a DSL which is able **reference some elements from an external model**. The external model could be any database, another DSL (a langium or a non-langium DSL) or some other model data. You require a node-module to query the external model.

The **use case** is to create glue model between different modeling worlds. Imagine a DSL to, e.g., glue an OpenAPI specification to a UML model: here you need a parser for an OpenAPI specification and one for the UML model. Your own DSL could reference both of these external models and act as glue between the two worlds.

In **this demo**, we demonstrate how to **reference elements from a JSON file**. Thus, the JSON file acts as external model / database.

## Implementation

The implementation is preliminary and needs to be discussed.

### Overview

* An additional service [`HelloJsonExternalJsonModel`](./src/language-server/hello-json-external-model.ts) for the JSON-database is registered in [`HelloJsonAddedServices`](./src/language-server/hello-json-module.ts). The responsibility of this module is to (1) load JSON files and (2) access the data in the JSON files (what elements are visible and from which file location do they come from).
* The [`HelloJsonCompletionProvider`](./src/language-server/hello-json-completion.ts) is responsible to auto complete references while being entered in the model.
* The [`HelloJsonValidator`](./src/language-server/hello-json-validator.ts) is responsible to indicate errors, if a reference is not found.
* The [`HelloJsonDefinitionProvider`](./src/language-server/hello-json-definition.ts) is responsible for the "Goto definition" functionality: You can press F12 on a reference to the JSON file and the jump to the location in the external model.

### Details

It seems mandatory, that the grammar element for the reference is kept simple, since the implementations sketched above are very simplistic. Simple means, that they consist of exactly one reference-field (`jsonLink`, see grammar sketch below) - since it seems not to be trivial to distinguish the fields in the completion and goto-definition code.

```ts
JsonReference:
    'reference' include=[JsonInclude]
    ':' jsonLink=FQN
```

## Try it out

Compile the project (`npm i`, `npm run build`) and press F5. You can then play with the model referencing an example JSON file.
