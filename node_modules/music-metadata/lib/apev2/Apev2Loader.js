export const apeParserLoader = {
    parserType: 'apev2',
    extensions: ['.ape'],
    async load(metadata, tokenizer, options) {
        return new (await import('./APEv2Parser.js')).APEv2Parser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=Apev2Loader.js.map