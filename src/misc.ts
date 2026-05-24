import type { BodyFor, QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export interface CompanyInfoApi {
  get(params?: QueryFor<'/2/company-info', 'get'>): Promise<ResponseFor<'/2/company-info', 'get'>>;
  update(companyId: number, body: BodyFor<'/2/company-info/update/{company_id}', 'patch'>): Promise<ResponseFor<'/2/company-info/update/{company_id}', 'patch'>>;
}

export class MiscApi {
  constructor(private readonly client: QuickClient) {}

  public partners(params?: QueryFor<'/1/partners', 'get'>): Promise<ResponseFor<'/1/partners', 'get'>> {
    return this.client.requestEndpoint('/1/partners', 'get', '/1/partners', { query: params });
  }

  public accounts(params?: QueryFor<'/1/accounts', 'get'>): Promise<ResponseFor<'/1/accounts', 'get'>> {
    return this.client.requestEndpoint('/1/accounts', 'get', '/1/accounts', { query: params });
  }

  public payments(params?: QueryFor<'/1/payments', 'get'>): Promise<ResponseFor<'/1/payments', 'get'>> {
    return this.client.requestEndpoint('/1/payments', 'get', '/1/payments', { query: params });
  }

  public pulse(params?: QueryFor<'/1/pulse', 'get'>): Promise<ResponseFor<'/1/pulse', 'get'>> {
    return this.client.requestEndpoint('/1/pulse', 'get', '/1/pulse', { query: params });
  }

  public uploadAuditXml(body: BodyFor<'/2/audit-xml', 'post'>): Promise<ResponseFor<'/2/audit-xml', 'post'>> {
    return this.client.requestEndpoint('/2/audit-xml', 'post', '/2/audit-xml', { body });
  }

  public readonly companyInfo: CompanyInfoApi = {
    get: (params) => this.client.requestEndpoint('/2/company-info', 'get', '/2/company-info', { query: params }),
    update: (companyId, body) => this.client.requestEndpoint('/2/company-info/update/{company_id}', 'patch', `/2/company-info/update/${companyId}`, { body }),
  };
}
