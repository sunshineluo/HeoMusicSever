export const riffParserLoader = {
    parserType: 'riff',
    extensions: ['.wav', 'wave', '.bwf'],
    async load(metadata, tokenizer, options) {
        return new (await import('./WaveParser.js')).WaveParser(metadata, tokenizer, options);
    }
};
//# sourceMappingURL=WaveLoader.js.map