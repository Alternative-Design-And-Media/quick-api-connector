import type { BodyFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export interface AccountingCrudApi {
  list(): Promise<ResponseFor<'/2/accounting/ledger-numbers', 'get'>>;
  create(body: BodyFor<'/2/accounting/ledger-numbers/create', 'post'>): Promise<ResponseFor<'/2/accounting/ledger-numbers/create', 'post'>>;
  update(id: number, body: BodyFor<'/2/accounting/ledger-numbers/update/{ledger_number_id}', 'post'>): Promise<ResponseFor<'/2/accounting/ledger-numbers/update/{ledger_number_id}', 'post'>>;
  delete(ids: number[]): Promise<ResponseFor<'/2/accounting/ledger-numbers/delete', 'post'>>;
}

export interface VatCategoriesCrudApi {
  list(): Promise<ResponseFor<'/2/accounting/vat-categories', 'get'>>;
  create(body: BodyFor<'/2/accounting/vat-categories/create', 'post'>): Promise<ResponseFor<'/2/accounting/vat-categories/create', 'post'>>;
  update(id: number, body: BodyFor<'/2/accounting/vat-categories/update/{company_vat_category_id}', 'post'>): Promise<ResponseFor<'/2/accounting/vat-categories/update/{company_vat_category_id}', 'post'>>;
  delete(ids: number[]): Promise<ResponseFor<'/2/accounting/vat-categories/delete', 'post'>>;
}

export class AccountingApi {
  constructor(private readonly client: QuickClient) {}

  public readonly ledgerNumbers: AccountingCrudApi = {
    list: () => this.client.requestEndpoint('/2/accounting/ledger-numbers', 'get', '/2/accounting/ledger-numbers'),
    create: (body) => this.client.requestEndpoint('/2/accounting/ledger-numbers/create', 'post', '/2/accounting/ledger-numbers/create', { body }),
    update: (id, body) => this.client.requestEndpoint('/2/accounting/ledger-numbers/update/{ledger_number_id}', 'post', `/2/accounting/ledger-numbers/update/${id}`, { body }),
    delete: (ids) => this.client.requestEndpoint('/2/accounting/ledger-numbers/delete', 'post', '/2/accounting/ledger-numbers/delete', { body: { ids } }),
  };

  public readonly vatCategories: VatCategoriesCrudApi = {
    list: () => this.client.requestEndpoint('/2/accounting/vat-categories', 'get', '/2/accounting/vat-categories'),
    create: (body) => this.client.requestEndpoint('/2/accounting/vat-categories/create', 'post', '/2/accounting/vat-categories/create', { body }),
    update: (id, body) => this.client.requestEndpoint('/2/accounting/vat-categories/update/{company_vat_category_id}', 'post', `/2/accounting/vat-categories/update/${id}`, { body }),
    delete: (ids) => this.client.requestEndpoint('/2/accounting/vat-categories/delete', 'post', '/2/accounting/vat-categories/delete', { body: { ids } }),
  };
}
