export const dsdiffParserLoader = {
    parserType: 'dsdiff',
    extensions: ['.dff'],
    async load(metadata, tokenizer, options) {
        return new (await import('./DsdiffParser.js')).DsdiffParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=DsdiffLoader.js.map