import 'isomorphic-fetch';
import { ExecutionResult, IntrospectionQuery } from 'graphql';
import { GraphQLSchemaValidationOptions } from 'graphql/type/schema';
import qs from 'qs';
export interface SchemaFetcher {
    (query: string, fetchImpl: typeof fetch, qsImpl: typeof qs): Promise<ExecutionResult<IntrospectionQuery>>;
}
export declare const get: <T>(uri: string, query: {
    [arg: string]: any;
}) => Promise<T>;
export declare const post: <T>(uri: string, body: {
    [arg: string]: any;
}) => Promise<T>;
export declare const fetchSchema: (endpoint: string, usePost?: boolean, options?: GraphQLSchemaValidationOptions | undefined) => Promise<import("graphql").GraphQLSchema>;
export declare const customFetchSchema: (fetcher: SchemaFetcher, options?: GraphQLSchemaValidationOptions | undefined) => Promise<import("graphql").GraphQLSchema>;
