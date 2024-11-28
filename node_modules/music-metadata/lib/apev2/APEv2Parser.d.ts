import * as strtok3 from 'strtok3';
import type { IOptions, IRandomReader, IApeHeader } from '../type.js';
import type { INativeMetadataCollector } from '../common/MetadataCollector.js';
import { BasicParser } from '../common/BasicParser.js';
import { type IFooter, type IHeader } from './APEv2Token.js';
declare const ApeContentError_base: {
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
export declare class ApeContentError extends ApeContentError_base {
}
export declare class APEv2Parser extends BasicParser {
    static tryParseApeHeader(metadata: INativeMetadataCollector, tokenizer: strtok3.ITokenizer, options: IOptions): Promise<void>;
    /**
     * Calculate the media file duration
     * @param ah ApeHeader
     * @return {number} duration in seconds
     */
    static calculateDuration(ah: IHeader): number;
    /**
     * Calculates the APEv1 / APEv2 first field offset
     * @param reader
     * @param offset
     */
    static findApeFooterOffset(reader: IRandomReader, offset: number): Promise<IApeHeader | undefined>;
    private static parseTagFooter;
    private ape;
    /**
     * Parse APEv1 / APEv2 header if header signature found
     */
    tryParseApeHeader(): Promise<void>;
    parse(): Promise<void>;
    parseTags(footer: IFooter): Promise<void>;
    private parseDescriptorExpansion;
    private parseHeader;
}
export {};
