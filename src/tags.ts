import type { BodyFor, QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';

export class TagsApi {
  constructor(private readonly client: QuickClient) {}

  public list(params?: QueryFor<'/2/tags', 'get'>): Promise<ResponseFor<'/2/tags', 'get'>> {
    return this.client.requestEndpoint('/2/tags', 'get', '/2/tags', { query: params });
  },

  public create(body: BodyFor<'/2/tags/create', 'post'>): Promise<ResponseFor<'/2/tags/create', 'post'>> {
    return this.client.requestEndpoint('/2/tags/create', 'post', '/2/tags/create', { body });
  },

  public update(body: BodyFor<'/2/tags/update', 'patch'>): Promise<ResponseFor<'/2/tags/update', 'patch'>> {
    return this.client.requestEndpoint('/2/tags/update', 'patch', '/2/tags/update', { body });
  },

  public delete(ids: number[]): Promise<ResponseFor<'/2/tags/delete', 'post'>> {
    return this.client.requestEndpoint('/2/tags/delete', 'post', '/2/tags/delete', { body: { ids } });
  }
}
