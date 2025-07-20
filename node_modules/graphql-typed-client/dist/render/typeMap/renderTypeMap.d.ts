import { GraphQLSchema } from 'graphql';
import { RenderContext } from '../common/RenderContext';
export interface ArgMap {
    [arg: string]: [string, string] | undefined;
}
export interface Field {
    type: string;
    args?: ArgMap;
}
export interface FieldMap {
    [field: string]: Field | undefined;
}
export interface Type {
    name: string;
    fields?: FieldMap;
    scalar?: string[];
}
export interface TypeMap {
    [type: string]: Type | undefined;
}
export declare const renderTypeMap: (schema: GraphQLSchema, ctx: RenderContext) => void;
