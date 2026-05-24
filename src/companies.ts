import type { ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export class CompaniesApi {
  constructor(private readonly client: QuickClient) {}

  public list(): Promise<ResponseFor<'/2/companies', 'get'>> {
    this.client.assertOAuthOnly('companies.list');
    return this.client.requestEndpoint('/2/companies', 'get', '/2/companies');
  },

  public getUserProfile(): Promise<ResponseFor<'/2/user-profile', 'get'>> {
    this.client.assertOAuthOnly('companies.getUserProfile');
    return this.client.requestEndpoint('/2/user-profile', 'get', '/2/user-profile');
  }
}
