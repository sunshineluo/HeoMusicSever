export const aiffParserLoader = {
    parserType: 'aiff',
    extensions: ['.aif', 'aiff', 'aifc'],
    async load(metadata, tokenizer, options) {
        return new (await import('./AiffParser.js')).AIFFParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=AiffLoader.js.map