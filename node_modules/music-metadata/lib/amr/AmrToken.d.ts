import type { IGetToken } from 'strtok3';
interface IFrameHeader {
    frameType: number;
}
/**
 * ID3v2 header
 * Ref: http://id3.org/id3v2.3.0#ID3v2_header
 * ToDo
 */
export declare const FrameHeader: IGetToken<IFrameHeader>;
export {};
