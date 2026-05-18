import type { BodyFor, QueryFor, QuickClient, ResponseFor } from './client.js';

export interface TaxesApi {
  listTaxCodes(params?: QueryFor<'/1/tax-codes', 'get'>): Promise<ResponseFor<'/1/tax-codes', 'get'>>;
  listMonthlyTaxesV1(params?: QueryFor<'/1/monthly-taxes', 'get'>): Promise<ResponseFor<'/1/monthly-taxes', 'get'>>;
  listMonthlyTaxesV2(params?: QueryFor<'/2/monthly-taxes', 'get'>): Promise<ResponseFor<'/2/monthly-taxes', 'get'>>;
  createTaxesV1(body: BodyFor<'/1/taxes/create', 'post'>): Promise<ResponseFor<'/1/taxes/create', 'post'>>;
  createTaxesV2(body: BodyFor<'/2/taxes/create', 'post'>): Promise<ResponseFor<'/2/taxes/create', 'post'>>;
  updateTaxesV1(body: BodyFor<'/1/taxes/update', 'post'>): Promise<ResponseFor<'/1/taxes/update', 'post'>>;
  updateTaxesV2(body: BodyFor<'/2/taxes/update', 'post'>): Promise<ResponseFor<'/2/taxes/update', 'post'>>;
  deleteTaxesV1(ids: number[]): Promise<ResponseFor<'/1/taxes/delete', 'post'>>;
  deleteTaxesV2(ids: number[]): Promise<ResponseFor<'/2/taxes/delete', 'post'>>;
}

export const taxesMethods: TaxesApi = {
  listTaxCodes(this: QuickClient, params) {
    return this.requestEndpoint('/1/tax-codes', 'get', '/1/tax-codes', { query: params });
  },

  listMonthlyTaxesV1(this: QuickClient, params) {
    return this.requestEndpoint('/1/monthly-taxes', 'get', '/1/monthly-taxes', { query: params });
  },

  listMonthlyTaxesV2(this: QuickClient, params) {
    return this.requestEndpoint('/2/monthly-taxes', 'get', '/2/monthly-taxes', { query: params });
  },

  createTaxesV1(this: QuickClient, body) {
    return this.requestEndpoint('/1/taxes/create', 'post', '/1/taxes/create', { body });
  },

  createTaxesV2(this: QuickClient, body) {
    return this.requestEndpoint('/2/taxes/create', 'post', '/2/taxes/create', { body });
  },

  updateTaxesV1(this: QuickClient, body) {
    return this.requestEndpoint('/1/taxes/update', 'post', '/1/taxes/update', { body });
  },

  updateTaxesV2(this: QuickClient, body) {
    return this.requestEndpoint('/2/taxes/update', 'post', '/2/taxes/update', { body });
  },

  deleteTaxesV1(this: QuickClient, ids) {
    return this.requestEndpoint('/1/taxes/delete', 'post', '/1/taxes/delete', { body: { ids } });
  },

  deleteTaxesV2(this: QuickClient, ids) {
    return this.requestEndpoint('/2/taxes/delete', 'post', '/2/taxes/delete', { body: { ids } });
  },
};
