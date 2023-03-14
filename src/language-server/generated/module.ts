/******************************************************************************
 * This file was generated by langium-cli 1.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { LangiumGeneratedServices, LangiumGeneratedSharedServices, LangiumSharedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { HelloJsonAstReflection } from './ast';
import { HelloJsonGrammar } from './grammar';

export const HelloJsonLanguageMetaData: LanguageMetaData = {
    languageId: 'hello-json',
    fileExtensions: ['.hellojson'],
    caseInsensitive: false
};

export const HelloJsonGeneratedSharedModule: Module<LangiumSharedServices, LangiumGeneratedSharedServices> = {
    AstReflection: () => new HelloJsonAstReflection()
};

export const HelloJsonGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => HelloJsonGrammar(),
    LanguageMetaData: () => HelloJsonLanguageMetaData,
    parser: {}
};
