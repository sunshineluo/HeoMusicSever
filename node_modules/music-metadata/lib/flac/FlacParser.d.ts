import { AbstractID3Parser } from '../id3v2/AbstractID3Parser.js';
export declare class FlacParser extends AbstractID3Parser {
    private vorbisParser;
    private padding;
    postId3v2Parse(): Promise<void>;
    private parseDataBlock;
    /**
     * Parse STREAMINFO
     */
    private parseBlockStreamInfo;
    /**
     * Parse VORBIS_COMMENT
     * Ref: https://www.xiph.org/vorbis/doc/Vorbis_I_spec.html#x1-640004.2.3
     */
    private parseComment;
    private parsePicture;
}
