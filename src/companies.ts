import type { QuickClient, ResponseFor } from './client.js';

export interface CompaniesApi {
  listCompanies(): Promise<ResponseFor<'/2/companies', 'get'>>;
  getUserProfile(): Promise<ResponseFor<'/2/user-profile', 'get'>>;
}

export const companiesMethods: CompaniesApi = {
  listCompanies(this: QuickClient) {
    this.assertOAuthOnly('listCompanies');
    return this.requestEndpoint('/2/companies', 'get', '/2/companies');
  },

  getUserProfile(this: QuickClient) {
    this.assertOAuthOnly('getUserProfile');
    return this.requestEndpoint('/2/user-profile', 'get', '/2/user-profile');
  },
};
