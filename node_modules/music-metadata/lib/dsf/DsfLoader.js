export const dsfParserLoader = {
    parserType: 'dsf',
    extensions: ['.dsf'],
    async load(metadata, tokenizer, options) {
        return new (await import('./DsfParser.js')).DsfParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=DsfLoader.js.map