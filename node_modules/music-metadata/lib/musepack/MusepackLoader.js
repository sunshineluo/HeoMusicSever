export const musepackParserLoader = {
    parserType: 'musepack',
    extensions: ['.mpc'],
    async load(metadata, tokenizer, options) {
        return new (await import('./MusepackParser.js')).MusepackParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=MusepackLoader.js.map