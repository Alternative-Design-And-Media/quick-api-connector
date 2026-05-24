import type { BodyFor, QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export class SalariesApi {
  constructor(private readonly client: QuickClient) {}

  public listMonthlyV1(params?: QueryFor<'/1/monthly-salaries', 'get'>): Promise<ResponseFor<'/1/monthly-salaries', 'get'>> {
    return this.client.requestEndpoint('/1/monthly-salaries', 'get', '/1/monthly-salaries', { query: params });
  },

  public listMonthlyV2(params?: QueryFor<'/2/monthly-salaries', 'get'>): Promise<ResponseFor<'/2/monthly-salaries', 'get'>> {
    return this.client.requestEndpoint('/2/monthly-salaries', 'get', '/2/monthly-salaries', { query: params });
  },

  public createV1(body: BodyFor<'/1/salaries/create', 'post'>): Promise<ResponseFor<'/1/salaries/create', 'post'>> {
    return this.client.requestEndpoint('/1/salaries/create', 'post', '/1/salaries/create', { body });
  },

  public createV2(body: BodyFor<'/2/salaries/create', 'post'>): Promise<ResponseFor<'/2/salaries/create', 'post'>> {
    return this.client.requestEndpoint('/2/salaries/create', 'post', '/2/salaries/create', { body });
  },

  public updateV1(body: BodyFor<'/1/salaries/update', 'post'>): Promise<ResponseFor<'/1/salaries/update', 'post'>> {
    return this.client.requestEndpoint('/1/salaries/update', 'post', '/1/salaries/update', { body });
  },

  public updateV2(body: BodyFor<'/2/salaries/update', 'post'>): Promise<ResponseFor<'/2/salaries/update', 'post'>> {
    return this.client.requestEndpoint('/2/salaries/update', 'post', '/2/salaries/update', { body });
  },

  public deleteV1(ids: number[]): Promise<ResponseFor<'/1/salaries/delete', 'post'>> {
    return this.client.requestEndpoint('/1/salaries/delete', 'post', '/1/salaries/delete', { body: { ids } });
  },

  public deleteV2(ids: number[]): Promise<ResponseFor<'/2/salaries/delete', 'post'>> {
    return this.client.requestEndpoint('/2/salaries/delete', 'post', '/2/salaries/delete', { body: { ids } });
  }
}
