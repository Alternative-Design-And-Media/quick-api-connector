import type { BodyFor, QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export class TaxesApi {
  constructor(private readonly client: QuickClient) {}

  public listCodes(params?: QueryFor<'/1/tax-codes', 'get'>): Promise<ResponseFor<'/1/tax-codes', 'get'>> {
    return this.client.requestEndpoint('/1/tax-codes', 'get', '/1/tax-codes', { query: params });
  },

  public listMonthlyV1(params?: QueryFor<'/1/monthly-taxes', 'get'>): Promise<ResponseFor<'/1/monthly-taxes', 'get'>> {
    return this.client.requestEndpoint('/1/monthly-taxes', 'get', '/1/monthly-taxes', { query: params });
  },

  public listMonthlyV2(params?: QueryFor<'/2/monthly-taxes', 'get'>): Promise<ResponseFor<'/2/monthly-taxes', 'get'>> {
    return this.client.requestEndpoint('/2/monthly-taxes', 'get', '/2/monthly-taxes', { query: params });
  },

  public createV1(body: BodyFor<'/1/taxes/create', 'post'>): Promise<ResponseFor<'/1/taxes/create', 'post'>> {
    return this.client.requestEndpoint('/1/taxes/create', 'post', '/1/taxes/create', { body });
  },

  public createV2(body: BodyFor<'/2/taxes/create', 'post'>): Promise<ResponseFor<'/2/taxes/create', 'post'>> {
    return this.client.requestEndpoint('/2/taxes/create', 'post', '/2/taxes/create', { body });
  },

  public updateV1(body: BodyFor<'/1/taxes/update', 'post'>): Promise<ResponseFor<'/1/taxes/update', 'post'>> {
    return this.client.requestEndpoint('/1/taxes/update', 'post', '/1/taxes/update', { body });
  },

  public updateV2(body: BodyFor<'/2/taxes/update', 'post'>): Promise<ResponseFor<'/2/taxes/update', 'post'>> {
    return this.client.requestEndpoint('/2/taxes/update', 'post', '/2/taxes/update', { body });
  },

  public deleteV1(ids: number[]): Promise<ResponseFor<'/1/taxes/delete', 'post'>> {
    return this.client.requestEndpoint('/1/taxes/delete', 'post', '/1/taxes/delete', { body: { ids } });
  },

  public deleteV2(ids: number[]): Promise<ResponseFor<'/2/taxes/delete', 'post'>> {
    return this.client.requestEndpoint('/2/taxes/delete', 'post', '/2/taxes/delete', { body: { ids } });
  }
}
