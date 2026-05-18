import type { QuickClient, ResponseFor } from './client.js';

export interface ArtifactsApi {
  getExpenseArtifacts(ids: number[]): Promise<ResponseFor<'/1/artifacts/expense', 'post'>>;
  getIncomeArtifacts(ids: number[]): Promise<ResponseFor<'/1/artifacts/income', 'post'>>;
}

export const artifactsMethods: ArtifactsApi = {
  getExpenseArtifacts(this: QuickClient, ids) {
    return this.requestEndpoint('/1/artifacts/expense', 'post', '/1/artifacts/expense', { body: { ids } });
  },

  getIncomeArtifacts(this: QuickClient, ids) {
    return this.requestEndpoint('/1/artifacts/income', 'post', '/1/artifacts/income', { body: { ids } });
  },
};
