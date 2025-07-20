import { GraphQLUnionType } from 'graphql';
import { RenderContext } from '../common/RenderContext';
import { FieldMap, Type } from './renderTypeMap';
export declare const unionType: (type: GraphQLUnionType, _: RenderContext) => Type & {
    fields: FieldMap;
};
