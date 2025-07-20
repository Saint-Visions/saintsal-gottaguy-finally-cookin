import 'isomorphic-fetch';
import qs from 'qs';
import { ExecutionResult, GraphQLError } from 'graphql';
import { Observable } from 'rxjs';
import { TypeMapper } from './applyTypeMapperToResponse';
import { LinkedType } from './linkTypeMap';
import { Fields, Gql } from './requestToGql';
import { SubscriptionCreatorOptions } from './getSubscriptionCreator';
export declare class ClientError extends Error {
    errors?: readonly GraphQLError[] | undefined;
    constructor(message?: string, errors?: readonly GraphQLError[] | undefined);
}
export interface Fetcher {
    (gql: Gql, fetchImpl: typeof fetch, qsImpl: typeof qs): Promise<ExecutionResult<any>>;
}
export interface Client<QR, QC, Q, MR, MC, M, SR, SC, S> {
    query(request: QR): Promise<ExecutionResult<Q>>;
    mutation(request: MR): Promise<ExecutionResult<M>>;
    subscription(request: SR): Observable<ExecutionResult<S>>;
    chain: {
        query: QC;
        mutation: MC;
        subscription: SC;
    };
}
export interface ClientOptions {
    fetcher?: Fetcher;
    subscriptionCreatorOptions?: SubscriptionCreatorOptions;
}
export interface ClientEmbeddedOptions {
    queryRoot?: LinkedType;
    mutationRoot?: LinkedType;
    subscriptionRoot?: LinkedType;
    typeMapper?: TypeMapper;
}
export declare const createClient: <QR extends Fields, QC, Q, MR extends Fields, MC, M, SR extends Fields, SC, S>({ fetcher, subscriptionCreatorOptions, queryRoot, mutationRoot, subscriptionRoot, typeMapper, }: ClientOptions & ClientEmbeddedOptions) => Client<QR, QC, Q, MR, MC, M, SR, SC, S>;
