/**
 * Primary entry point, Node.js specific entry point is MusepackParser.ts
 */
import { fromWebStream, fromBuffer } from 'strtok3';
import { ParserFactory } from './ParserFactory.js';
import { RandomUint8ArrayReader } from './common/RandomUint8ArrayReader.js';
import { APEv2Parser } from './apev2/APEv2Parser.js';
import { hasID3v1Header } from './id3v1/ID3v1Parser.js';
import { getLyricsHeaderLength } from './lyrics3/Lyrics3.js';
export { LyricsContentType, TimestampFormat } from './type.js';
/**
 * Parse Web API File
 * Requires Blob to be able to stream using a ReadableStreamBYOBReader, only available since Node.js ≥ 20
 * @param blob - Blob to parse
 * @param options - Parsing options
 * @returns Metadata
 */
export async function parseBlob(blob, options = {}) {
    const fileInfo = { mimeType: blob.type, size: blob.size };
    if (blob instanceof File) {
        fileInfo.path = blob.name;
    }
    return parseWebStream(blob.stream(), fileInfo, options);
}
/**
 * Parse audio from Web Stream.Readable
 * @param webStream - WebStream to read the audio track from
 * @param options - Parsing options
 * @param fileInfo - File information object or MIME-type string
 * @returns Metadata
 */
export function parseWebStream(webStream, fileInfo, options = {}) {
    return parseFromTokenizer(fromWebStream(webStream, { fileInfo: typeof fileInfo === 'string' ? { mimeType: fileInfo } : fileInfo }), options);
}
/**
 * Parse audio from memory
 * @param uint8Array - Uint8Array holding audio data
 * @param fileInfo - File information object or MIME-type string
 * @param options - Parsing options
 * @returns Metadata
 * Ref: https://github.com/Borewit/strtok3/blob/e6938c81ff685074d5eb3064a11c0b03ca934c1d/src/index.ts#L15
 */
export async function parseBuffer(uint8Array, fileInfo, options = {}) {
    const bufferReader = new RandomUint8ArrayReader(uint8Array);
    await scanAppendingHeaders(bufferReader, options);
    const tokenizer = fromBuffer(uint8Array, { fileInfo: typeof fileInfo === 'string' ? { mimeType: fileInfo } : fileInfo });
    return parseFromTokenizer(tokenizer, options);
}
/**
 * Parse audio from ITokenizer source
 * @param tokenizer - Audio source implementing the tokenizer interface
 * @param options - Parsing options
 * @returns Metadata
 */
export function parseFromTokenizer(tokenizer, options) {
    const parserFactory = new ParserFactory();
    return parserFactory.parse(tokenizer, undefined, options);
}
/**
 * Create a dictionary ordered by their tag id (key)
 * @param nativeTags list of tags
 * @returns tags indexed by id
 */
export function orderTags(nativeTags) {
    const tags = {};
    for (const { id, value } of nativeTags) {
        if (!tags[id]) {
            tags[id] = [];
        }
        tags[id].push(value);
    }
    return tags;
}
/**
 * Convert rating to 1-5 star rating
 * @param rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns Number of stars: 1, 2, 3, 4 or 5 stars
 */
export function ratingToStars(rating) {
    return rating === undefined ? 0 : 1 + Math.round(rating * 4);
}
/**
 * Select most likely cover image.
 * @param pictures Usually metadata.common.picture
 * @return Cover image, if any, otherwise null
 */
export function selectCover(pictures) {
    return pictures ? pictures.reduce((acc, cur) => {
        if (cur.name && cur.name.toLowerCase() in ['front', 'cover', 'cover (front)'])
            return cur;
        return acc;
    }) : null;
}
export async function scanAppendingHeaders(randomReader, options = {}) {
    let apeOffset = randomReader.fileSize;
    if (await hasID3v1Header(randomReader)) {
        apeOffset -= 128;
        const lyricsLen = await getLyricsHeaderLength(randomReader);
        apeOffset -= lyricsLen;
    }
    options.apeHeader = await APEv2Parser.findApeFooterOffset(randomReader, apeOffset);
}
