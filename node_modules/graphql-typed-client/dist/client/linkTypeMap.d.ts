import { TypeMap } from '../render/typeMap/renderTypeMap';
export interface LinkedArgMap {
    [arg: string]: [string, LinkedType] | undefined;
}
export interface LinkedField {
    type: LinkedType;
    args?: LinkedArgMap;
}
export interface LinkedFieldMap {
    [field: string]: LinkedField | undefined;
}
export interface LinkedType {
    name: string;
    fields?: LinkedFieldMap;
    scalar?: string[];
}
export interface LinkedTypeMap {
    [type: string]: LinkedType | undefined;
}
export declare const linkTypeMap: (typeMap: TypeMap) => LinkedTypeMap;
