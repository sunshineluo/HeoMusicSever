export const amrParserLoader = {
    parserType: 'amr',
    extensions: ['.amr'],
    async load(metadata, tokenizer, options) {
        return new (await import('./AmrParser.js')).AmrParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=AmrLoader.js.map