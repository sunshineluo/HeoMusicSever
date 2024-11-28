import type { ITokenizer } from 'strtok3';
import type * as Ogg from '../Ogg.js';
import type { IOptions } from '../../type.js';
import type { INativeMetadataCollector } from '../../common/MetadataCollector.js';
/**
 * Ref:
 * - https://theora.org/doc/Theora.pdf
 */
export declare class TheoraParser implements Ogg.IPageConsumer {
    private metadata;
    private tokenizer;
    constructor(metadata: INativeMetadataCollector, options: IOptions, tokenizer: ITokenizer);
    /**
     * Vorbis 1 parser
     * @param header Ogg Page Header
     * @param pageData Page data
     */
    parsePage(header: Ogg.IPageHeader, pageData: Uint8Array): Promise<void>;
    flush(): Promise<void>;
    calculateDuration(header: Ogg.IPageHeader): void;
    /**
     * Parse first Theora Ogg page. the initial identification header packet
     * @param {IPageHeader} header
     * @param {Buffer} pageData
     */
    protected parseFirstPage(header: Ogg.IPageHeader, pageData: Uint8Array): Promise<void>;
}
