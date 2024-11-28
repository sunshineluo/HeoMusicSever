import type { IEbmlDoc } from '../ebml/types.js';
export interface ISeek {
    id: Uint8Array;
    position: number;
}
export interface ISeekHead {
    seek: ISeek[];
}
export interface ISegmentInformation {
    uid?: Uint8Array;
    timecodeScale?: number;
    duration?: number;
    dateUTC?: number;
    title?: string;
    muxingApp?: string;
    writingApp?: string;
}
export interface ITrackEntry {
    uid?: Uint8Array;
    trackNumber: number;
    trackType?: TrackType;
    audio: ITrackAudio;
    video?: ITrackVideo;
    flagEnabled?: boolean;
    flagDefault?: boolean;
    flagLacing?: boolean;
    defaultDuration?: number;
    trackTimecodeScale?: number;
    name?: string;
    language?: string;
    codecID: string;
    codecPrivate?: Uint8Array;
    codecName?: string;
    codecSettings?: string;
    codecInfoUrl?: string;
    codecDownloadUrl?: string;
    codecDecodeAll?: string;
    trackOverlay?: string;
}
export interface ITrackVideo {
    flagInterlaced?: boolean;
    stereoMode?: number;
    pixelWidth?: number;
    pixelHeight?: number;
    displayWidth?: number;
    displayHeight?: number;
    displayUnit?: number;
    aspectRatioType?: number;
    colourSpace?: Uint8Array;
    gammaValue?: number;
}
export interface ITrackAudio {
    samplingFrequency?: number;
    outputSamplingFrequency?: number;
    channels?: number;
    channelPositions?: Uint8Array;
    bitDepth?: number;
}
export interface ICuePoint {
    cueTime?: number;
    cueTrackPositions: ICueTrackPosition[];
}
export interface ICueTrackPosition {
    cueTrack?: number;
    cueClusterPosition?: number;
    cueBlockNumber?: number;
    cueCodecState?: number;
    cueReference?: ICueReference;
}
export interface ICueReference {
    cueRefTime?: number;
    cueRefCluster?: number;
    cueRefNumber?: number;
    cueRefCodecState?: number;
}
export interface ISimpleTag {
    name?: string;
    'string'?: string;
    binary?: Uint8Array;
    language?: string;
    default?: boolean;
}
export declare enum TargetType {
    shot = 10,
    scene = 20,
    track = 30,
    part = 40,
    album = 50,
    edition = 60,
    collection = 70
}
export declare enum TrackType {
    video = 1,
    audio = 2,
    complex = 3,
    logo = 4,
    subtitle = 17,
    button = 18,
    control = 32
}
export type TrackTypeKey = keyof TrackType;
export interface ITarget {
    trackUID?: Uint8Array;
    chapterUID?: Uint8Array;
    attachmentUID?: Uint8Array;
    targetTypeValue?: TargetType;
    targetType?: string;
}
export interface ITag {
    target: ITarget;
    simpleTags: ISimpleTag[];
}
export interface ITags {
    tag: ITag[];
}
export interface ITrackElement {
    entries?: ITrackEntry[];
}
export interface IAttachmedFile {
    description?: string;
    name: string;
    mimeType: string;
    data: Uint8Array;
    uid: string;
}
export interface IAttachments {
    attachedFiles: IAttachmedFile[];
}
export interface IMatroskaSegment {
    metaSeekInfo?: ISeekHead;
    seekHeads?: ISeek[];
    info?: ISegmentInformation;
    tracks?: ITrackElement;
    tags?: ITags;
    cues?: ICuePoint[];
    attachments?: IAttachments;
}
export interface IMatroskaDoc extends IEbmlDoc {
    segment: IMatroskaSegment;
}
