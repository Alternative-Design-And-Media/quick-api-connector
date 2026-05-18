import type { QueryFor, QuickClient, ResponseFor } from './client.js';
import type { IncomeFields } from './types/index.js';

export type ListIncomesParams = QueryFor<'/1/incomes', 'get'>;

export interface IncomesApi {
  listIncomes(params?: ListIncomesParams): Promise<ResponseFor<'/1/incomes', 'get'>>;
  getIncome(incomeId: number, fields?: IncomeFields[]): Promise<ResponseFor<'/1/incomes/{income_id}', 'get'>>;
}

export const incomesMethods: IncomesApi = {
  listIncomes(this: QuickClient, params) {
    return this.requestEndpoint('/1/incomes', 'get', '/1/incomes', { query: params });
  },

  getIncome(this: QuickClient, incomeId, fields) {
    return this.requestEndpoint('/1/incomes/{income_id}', 'get', `/1/incomes/${incomeId}`, {
      query: fields ? ({ fields: fields.join(',') } as QueryFor<'/1/incomes/{income_id}', 'get'>) : undefined,
    });
  },
};
