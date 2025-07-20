import { GraphQLArgument, GraphQLEnumValue, GraphQLField, GraphQLInputField, GraphQLNamedType } from 'graphql';
export declare const comment: (comment: {
    text?: string | null | undefined;
    deprecated?: string | null | undefined;
}) => string;
export declare const typeComment: (type: GraphQLNamedType) => string;
export declare const fieldComment: (field: GraphQLEnumValue | GraphQLField<any, any, any>) => string;
export declare const argumentComment: (arg: GraphQLArgument | GraphQLInputField) => string;
