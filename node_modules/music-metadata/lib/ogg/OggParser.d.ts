import { type IGetToken } from 'strtok3';
import { BasicParser } from '../common/BasicParser.js';
import type * as Ogg from './Ogg.js';
declare const OggContentError_base: {
    new (message: string): {
        readonly fileType: string;
        toString(): string;
        name: "UnexpectedFileContentError";
        message: string;
        stack?: string;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
export declare class OggContentError extends OggContentError_base {
}
export declare class SegmentTable implements IGetToken<Ogg.ISegmentTable> {
    private static sum;
    len: number;
    constructor(header: Ogg.IPageHeader);
    get(buf: Uint8Array, off: number): Ogg.ISegmentTable;
}
/**
 * Parser for Ogg logical bitstream framing
 */
export declare class OggParser extends BasicParser {
    private static Header;
    private header;
    private pageNumber;
    private pageConsumer;
    /**
     * Parse page
     * @returns {Promise<void>}
     */
    parse(): Promise<void>;
}
export {};
