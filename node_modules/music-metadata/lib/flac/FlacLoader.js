export const flacParserLoader = {
    parserType: 'flac',
    extensions: ['.flac'],
    async load(metadata, tokenizer, options) {
        return new (await import('./FlacParser.js')).FlacParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=FlacLoader.js.map