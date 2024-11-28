import { getBitAllignedNumber } from '../common/Util.js';
/**
 * ID3v2 header
 * Ref: http://id3.org/id3v2.3.0#ID3v2_header
 * ToDo
 */
export const FrameHeader = {
    len: 1,
    get: (buf, off) => {
        return {
            frameType: getBitAllignedNumber(buf, off, 1, 4)
        };
    }
};
//# sourceMappingURL=AmrToken.js.map