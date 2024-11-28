export const asfParserLoader = {
    parserType: 'asf',
    extensions: ['.asf'],
    async load(metadata, tokenizer, options) {
        return new (await import('./AsfParser.js')).AsfParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=AsfLoader.js.map