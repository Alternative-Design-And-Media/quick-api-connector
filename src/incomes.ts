import type { QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';
import type { IncomeFields } from './types/index.js';

export type ListIncomesParams = QueryFor<'/1/incomes', 'get'>;

export class IncomesApi {
  constructor(private readonly client: QuickClient) {}

  public list(params?: ListIncomesParams): Promise<ResponseFor<'/1/incomes', 'get'>> {
    return this.client.requestEndpoint('/1/incomes', 'get', '/1/incomes', { query: params });
  },

  public get(incomeId: number, fields?: IncomeFields[]): Promise<ResponseFor<'/1/incomes/{income_id}', 'get'>> {
    return this.client.requestEndpoint('/1/incomes/{income_id}', 'get', `/1/incomes/${incomeId}`, {
      query: fields ? ({ fields: fields.join(',') } as QueryFor<'/1/incomes/{income_id}', 'get'>) : undefined,
    });
  }
}
