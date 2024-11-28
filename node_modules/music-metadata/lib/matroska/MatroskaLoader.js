export const matroskaParserLoader = {
    parserType: 'matroska',
    extensions: ['.mka', '.mkv', '.mk3d', '.mks', 'webm'],
    async load(metadata, tokenizer, options) {
        return new (await import('./MatroskaParser.js')).MatroskaParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=MatroskaLoader.js.map