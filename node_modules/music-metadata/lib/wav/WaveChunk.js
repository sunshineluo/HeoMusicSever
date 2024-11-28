import * as Token from 'token-types';
import { makeUnexpectedFileContentError } from '../ParseError.js';
export class WaveContentError extends makeUnexpectedFileContentError('Wave') {
}
/**
 * Ref: https://msdn.microsoft.com/en-us/library/windows/desktop/dd317599(v=vs.85).aspx
 */
export var WaveFormat;
(function (WaveFormat) {
    WaveFormat[WaveFormat["PCM"] = 1] = "PCM";
    // MPEG-4 and AAC Audio Types
    WaveFormat[WaveFormat["ADPCM"] = 2] = "ADPCM";
    WaveFormat[WaveFormat["IEEE_FLOAT"] = 3] = "IEEE_FLOAT";
    WaveFormat[WaveFormat["MPEG_ADTS_AAC"] = 5632] = "MPEG_ADTS_AAC";
    WaveFormat[WaveFormat["MPEG_LOAS"] = 5634] = "MPEG_LOAS";
    WaveFormat[WaveFormat["RAW_AAC1"] = 255] = "RAW_AAC1";
    // Dolby Audio Types
    WaveFormat[WaveFormat["DOLBY_AC3_SPDIF"] = 146] = "DOLBY_AC3_SPDIF";
    WaveFormat[WaveFormat["DVM"] = 8192] = "DVM";
    WaveFormat[WaveFormat["RAW_SPORT"] = 576] = "RAW_SPORT";
    WaveFormat[WaveFormat["ESST_AC3"] = 577] = "ESST_AC3";
    WaveFormat[WaveFormat["DRM"] = 9] = "DRM";
    WaveFormat[WaveFormat["DTS2"] = 8193] = "DTS2";
    WaveFormat[WaveFormat["MPEG"] = 80] = "MPEG";
})(WaveFormat || (WaveFormat = {}));
/**
 * format chunk; chunk-id is "fmt "
 * http://soundfile.sapp.org/doc/WaveFormat/
 */
export class Format {
    constructor(header) {
        if (header.chunkSize < 16)
            throw new WaveContentError('Invalid chunk size');
        this.len = header.chunkSize;
    }
    get(buf, off) {
        return {
            wFormatTag: Token.UINT16_LE.get(buf, off),
            nChannels: Token.UINT16_LE.get(buf, off + 2),
            nSamplesPerSec: Token.UINT32_LE.get(buf, off + 4),
            nAvgBytesPerSec: Token.UINT32_LE.get(buf, off + 8),
            nBlockAlign: Token.UINT16_LE.get(buf, off + 12),
            wBitsPerSample: Token.UINT16_LE.get(buf, off + 14)
        };
    }
}
/**
 * Fact chunk; chunk-id is "fact"
 * http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html
 * http://www.recordingblogs.com/wiki/fact-chunk-of-a-wave-file
 */
export class FactChunk {
    constructor(header) {
        if (header.chunkSize < 4) {
            throw new WaveContentError('Invalid fact chunk size.');
        }
        this.len = header.chunkSize;
    }
    get(buf, off) {
        return {
            dwSampleLength: Token.UINT32_LE.get(buf, off)
        };
    }
}
//# sourceMappingURL=WaveChunk.js.map