export const wavpackParserLoader = {
    parserType: 'wavpack',
    extensions: ['.wv', '.wvp'],
    async load(metadata, tokenizer, options) {
        return new (await import('./WavPackParser.js')).WavPackParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=WavPackLoader.js.map