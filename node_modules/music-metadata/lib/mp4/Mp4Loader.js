export const mp4ParserLoader = {
    parserType: 'mp4',
    extensions: ['.mp4', '.m4a', '.m4b', '.m4pa', 'm4v', 'm4r', '3gp'],
    async load(metadata, tokenizer, options) {
        return new (await import('./MP4Parser.js')).MP4Parser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=Mp4Loader.js.map