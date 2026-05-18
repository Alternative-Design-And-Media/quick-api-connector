import type { BodyFor, QueryFor, QuickClient, ResponseFor } from './client.js';

export interface SalariesApi {
  listMonthlySalariesV1(params?: QueryFor<'/1/monthly-salaries', 'get'>): Promise<ResponseFor<'/1/monthly-salaries', 'get'>>;
  listMonthlySalariesV2(params?: QueryFor<'/2/monthly-salaries', 'get'>): Promise<ResponseFor<'/2/monthly-salaries', 'get'>>;
  createSalariesV1(body: BodyFor<'/1/salaries/create', 'post'>): Promise<ResponseFor<'/1/salaries/create', 'post'>>;
  createSalariesV2(body: BodyFor<'/2/salaries/create', 'post'>): Promise<ResponseFor<'/2/salaries/create', 'post'>>;
  updateSalariesV1(body: BodyFor<'/1/salaries/update', 'post'>): Promise<ResponseFor<'/1/salaries/update', 'post'>>;
  updateSalariesV2(body: BodyFor<'/2/salaries/update', 'post'>): Promise<ResponseFor<'/2/salaries/update', 'post'>>;
  deleteSalariesV1(ids: number[]): Promise<ResponseFor<'/1/salaries/delete', 'post'>>;
  deleteSalariesV2(ids: number[]): Promise<ResponseFor<'/2/salaries/delete', 'post'>>;
}

export const salariesMethods: SalariesApi = {
  listMonthlySalariesV1(this: QuickClient, params) {
    return this.requestEndpoint('/1/monthly-salaries', 'get', '/1/monthly-salaries', { query: params });
  },

  listMonthlySalariesV2(this: QuickClient, params) {
    return this.requestEndpoint('/2/monthly-salaries', 'get', '/2/monthly-salaries', { query: params });
  },

  createSalariesV1(this: QuickClient, body) {
    return this.requestEndpoint('/1/salaries/create', 'post', '/1/salaries/create', { body });
  },

  createSalariesV2(this: QuickClient, body) {
    return this.requestEndpoint('/2/salaries/create', 'post', '/2/salaries/create', { body });
  },

  updateSalariesV1(this: QuickClient, body) {
    return this.requestEndpoint('/1/salaries/update', 'post', '/1/salaries/update', { body });
  },

  updateSalariesV2(this: QuickClient, body) {
    return this.requestEndpoint('/2/salaries/update', 'post', '/2/salaries/update', { body });
  },

  deleteSalariesV1(this: QuickClient, ids) {
    return this.requestEndpoint('/1/salaries/delete', 'post', '/1/salaries/delete', { body: { ids } });
  },

  deleteSalariesV2(this: QuickClient, ids) {
    return this.requestEndpoint('/2/salaries/delete', 'post', '/2/salaries/delete', { body: { ids } });
  },
};
