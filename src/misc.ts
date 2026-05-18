import type { BodyFor, QueryFor, QuickClient, ResponseFor } from './client.js';

export interface MiscApi {
  listPartners(params?: QueryFor<'/1/partners', 'get'>): Promise<ResponseFor<'/1/partners', 'get'>>;
  listAccounts(params?: QueryFor<'/1/accounts', 'get'>): Promise<ResponseFor<'/1/accounts', 'get'>>;
  listPayments(params?: QueryFor<'/1/payments', 'get'>): Promise<ResponseFor<'/1/payments', 'get'>>;
  pulse(params?: QueryFor<'/1/pulse', 'get'>): Promise<ResponseFor<'/1/pulse', 'get'>>;
  uploadAuditXml(body: BodyFor<'/2/audit-xml', 'post'>): Promise<ResponseFor<'/2/audit-xml', 'post'>>;
  getCompanyInfo(params?: QueryFor<'/2/company-info', 'get'>): Promise<ResponseFor<'/2/company-info', 'get'>>;
  updateCompanyInfo(companyId: number, body: BodyFor<'/2/company-info/update/{company_id}', 'patch'>): Promise<ResponseFor<'/2/company-info/update/{company_id}', 'patch'>>;
}

export const miscMethods: MiscApi = {
  listPartners(this: QuickClient, params) {
    return this.requestEndpoint('/1/partners', 'get', '/1/partners', { query: params });
  },

  listAccounts(this: QuickClient, params) {
    return this.requestEndpoint('/1/accounts', 'get', '/1/accounts', { query: params });
  },

  listPayments(this: QuickClient, params) {
    return this.requestEndpoint('/1/payments', 'get', '/1/payments', { query: params });
  },

  pulse(this: QuickClient, params) {
    return this.requestEndpoint('/1/pulse', 'get', '/1/pulse', { query: params });
  },

  uploadAuditXml(this: QuickClient, body) {
    return this.requestEndpoint('/2/audit-xml', 'post', '/2/audit-xml', { body });
  },

  getCompanyInfo(this: QuickClient, params) {
    return this.requestEndpoint('/2/company-info', 'get', '/2/company-info', { query: params });
  },

  updateCompanyInfo(this: QuickClient, companyId, body) {
    return this.requestEndpoint('/2/company-info/update/{company_id}', 'patch', `/2/company-info/update/${companyId}`, { body });
  },
};
