import type { BodyFor, QuickClient, ResponseFor } from './client.js';

export interface AccountingApi {
  listLedgerNumbers(): Promise<ResponseFor<'/2/accounting/ledger-numbers', 'get'>>;
  createLedgerNumbers(body: BodyFor<'/2/accounting/ledger-numbers/create', 'post'>): Promise<ResponseFor<'/2/accounting/ledger-numbers/create', 'post'>>;
  updateLedgerNumber(ledgerNumberId: number, body: BodyFor<'/2/accounting/ledger-numbers/update/{ledger_number_id}', 'post'>): Promise<ResponseFor<'/2/accounting/ledger-numbers/update/{ledger_number_id}', 'post'>>;
  deleteLedgerNumbers(ids: number[]): Promise<ResponseFor<'/2/accounting/ledger-numbers/delete', 'post'>>;
  listVatCategories(): Promise<ResponseFor<'/2/accounting/vat-categories', 'get'>>;
  createVatCategories(body: BodyFor<'/2/accounting/vat-categories/create', 'post'>): Promise<ResponseFor<'/2/accounting/vat-categories/create', 'post'>>;
  updateVatCategory(companyVatCategoryId: number, body: BodyFor<'/2/accounting/vat-categories/update/{company_vat_category_id}', 'post'>): Promise<ResponseFor<'/2/accounting/vat-categories/update/{company_vat_category_id}', 'post'>>;
  deleteVatCategories(ids: number[]): Promise<ResponseFor<'/2/accounting/vat-categories/delete', 'post'>>;
}

export const accountingMethods: AccountingApi = {
  listLedgerNumbers(this: QuickClient) {
    return this.requestEndpoint('/2/accounting/ledger-numbers', 'get', '/2/accounting/ledger-numbers');
  },

  createLedgerNumbers(this: QuickClient, body) {
    return this.requestEndpoint('/2/accounting/ledger-numbers/create', 'post', '/2/accounting/ledger-numbers/create', { body });
  },

  updateLedgerNumber(this: QuickClient, ledgerNumberId, body) {
    return this.requestEndpoint('/2/accounting/ledger-numbers/update/{ledger_number_id}', 'post', `/2/accounting/ledger-numbers/update/${ledgerNumberId}`, { body });
  },

  deleteLedgerNumbers(this: QuickClient, ids) {
    return this.requestEndpoint('/2/accounting/ledger-numbers/delete', 'post', '/2/accounting/ledger-numbers/delete', { body: { ids } });
  },

  listVatCategories(this: QuickClient) {
    return this.requestEndpoint('/2/accounting/vat-categories', 'get', '/2/accounting/vat-categories');
  },

  createVatCategories(this: QuickClient, body) {
    return this.requestEndpoint('/2/accounting/vat-categories/create', 'post', '/2/accounting/vat-categories/create', { body });
  },

  updateVatCategory(this: QuickClient, companyVatCategoryId, body) {
    return this.requestEndpoint('/2/accounting/vat-categories/update/{company_vat_category_id}', 'post', `/2/accounting/vat-categories/update/${companyVatCategoryId}`, { body });
  },

  deleteVatCategories(this: QuickClient, ids) {
    return this.requestEndpoint('/2/accounting/vat-categories/delete', 'post', '/2/accounting/vat-categories/delete', { body: { ids } });
  },
};
