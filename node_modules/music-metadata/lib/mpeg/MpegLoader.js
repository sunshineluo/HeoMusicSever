export const mpegParserLoader = {
    parserType: 'mpeg',
    extensions: ['.mp2', '.mp3', '.m2a', '.aac', 'aacp'],
    async load(metadata, tokenizer, options) {
        return new (await import('./MpegParser.js')).MpegParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=MpegLoader.js.map