import { type ITokenizer } from 'strtok3';
import { type IElementType, type ITree, type ValueType } from './types.js';
declare const EbmlContentError_base: {
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
export declare class EbmlContentError extends EbmlContentError_base {
}
export interface ILinkedElementType extends IElementType {
    id: number;
    parent: ILinkedElementType | undefined;
    readonly container?: {
        [id: number]: ILinkedElementType;
    };
}
export declare enum ParseAction {
    ReadNext = 0,// Continue reading the next elements
    IgnoreElement = 2,// Ignore (do not read) this element
    SkipSiblings = 3,// Skip all remaining elements at the same level
    TerminateParsing = 4,// Terminate the parsing process
    SkipElement = 5
}
/**
 * @return true, to quit the parser
 */
export type IElementListener = {
    startNext: (dtdElement: ILinkedElementType) => ParseAction;
    elementValue: (dtdElement: ILinkedElementType, value: ValueType, offset: number) => Promise<void>;
};
/**
 * Extensible Binary Meta Language (EBML) iterator
 * https://en.wikipedia.org/wiki/Extensible_Binary_Meta_Language
 * http://matroska.sourceforge.net/technical/specs/rfc/index.html
 *
 * WEBM VP8 AUDIO FILE
 */
export declare class EbmlIterator {
    private tokenizer;
    private padding;
    private parserMap;
    private ebmlMaxIDLength;
    private ebmlMaxSizeLength;
    /**
     * @param {ITokenizer} tokenizer Input
     * @param tokenizer
     */
    constructor(tokenizer: ITokenizer);
    iterate(dtdElement: IElementType, posDone: number, listener: IElementListener): Promise<ITree>;
    private parseContainer;
    private readVintData;
    private readElement;
    private readFloat;
    private readFlag;
    private readUint;
    private readString;
    private readBuffer;
}
export declare function getElementPath(element: ILinkedElementType): string;
export {};
