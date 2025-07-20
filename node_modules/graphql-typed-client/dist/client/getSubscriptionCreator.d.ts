import { Observable } from 'rxjs';
import { ClientOptions } from 'subscriptions-transport-ws';
import { Gql } from './requestToGql';
export interface SubscriptionCreatorOptions {
    uri: string;
    options?: ClientOptions;
}
export declare const getSubscriptionCreator: ({ uri, options }: SubscriptionCreatorOptions) => (gql: Gql) => Observable<any>;
