import { describe, expect, it, vi } from 'vitest';

import { createQuickApiClient } from '../client.js';

describe('createQuickApiClient', () => {
  it('builds the request URL and auth header', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    const client = createQuickApiClient({
      baseUrl: 'api.example.com',
      token: 'secret',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    await client.get('/users', { query: { page: 1 } });

    expect(fetchFn).toHaveBeenCalledWith('https://api.example.com/users?page=1', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer secret',
        'Content-Type': 'application/json',
      },
    });
  });

  it('throws on failed response', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
    });

    const client = createQuickApiClient({
      baseUrl: 'api.example.com',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    await expect(client.get('/users')).rejects.toThrow('Request failed with status 400');
  });
});
