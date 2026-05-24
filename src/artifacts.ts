import type { ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export class ArtifactsApi {
  constructor(private readonly client: QuickClient) {}

  public getExpense(ids: number[]): Promise<ResponseFor<'/1/artifacts/expense', 'post'>> {
    return this.client.requestEndpoint('/1/artifacts/expense', 'post', '/1/artifacts/expense', { body: { ids } });
  },

  public getIncome(ids: number[]): Promise<ResponseFor<'/1/artifacts/income', 'post'>> {
    return this.client.requestEndpoint('/1/artifacts/income', 'post', '/1/artifacts/income', { body: { ids } });
  }
}
