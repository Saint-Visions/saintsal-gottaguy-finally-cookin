import { GraphQLNamedType } from 'graphql';
import { RenderContext } from '../common/RenderContext';
export declare const hasTypeMappedAlias: (type: GraphQLNamedType, ctx: RenderContext) => boolean | undefined;
export declare const renderTypeMappedAlias: (type: GraphQLNamedType, ctx: RenderContext) => void;
