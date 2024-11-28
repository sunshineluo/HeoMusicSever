export const oggParserLoader = {
    parserType: 'ogg',
    extensions: ['.ogg', '.ogv', '.oga', '.ogm', '.ogx', '.opus', '.spx'],
    async load(metadata, tokenizer, options) {
        return new (await import('./OggParser.js')).OggParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=OggLoader.js.map