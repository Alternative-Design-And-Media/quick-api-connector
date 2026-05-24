import { describe, expect, it, vi } from 'vitest';

import { createQuickClient } from '../client.js';

describe('QuickClient', () => {
  it('injects Token auth and optional company header', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ results: [] }),
    });

    const client = createQuickClient({
      apiToken: 'secret-token',
      companyId: '1234',
      baseUrl: 'https://api.example.com',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    await client.expenses.listV1({ page: 2, page_size: 50 });

    expect(fetchFn).toHaveBeenCalledWith('https://api.example.com/1/expenses?page=2&page_size=50', {
      method: 'GET',
      headers: {
        Authorization: 'Token secret-token',
        'Content-Type': 'application/json',
        'Quick-Company-Id': '1234',
      },
      body: undefined,
    });
  });

  it('supports OAuth bearer mode and OAuth-only endpoints', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ([]),
    });

    const client = createQuickClient({
      bearerToken: 'oauth-token',
      companyId: '99',
      baseUrl: 'https://api.example.com',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    await client.companies.list();

    expect(fetchFn).toHaveBeenCalledWith('https://api.example.com/2/companies', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer oauth-token',
        'Content-Type': 'application/json',
        'Quick-Company-Id': '99',
      },
      body: undefined,
    });
  });

  it('builds field and pagination query params on endpoint methods', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ next: null, previous: null, results: [] }),
    });

    const client = createQuickClient({
      apiToken: 'secret-token',
      baseUrl: 'https://api.example.com',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    await client.expenses.getV2(42, ['items', 'post_its']);

    expect(fetchFn).toHaveBeenCalledWith('https://api.example.com/2/expenses/42?fields=items%2Cpost_its', expect.any(Object));
  });

  it('throws for OAuth-only endpoint when using token auth', async () => {
    const fetchFn = vi.fn();

    const client = createQuickClient({
      apiToken: 'token',
      baseUrl: 'https://api.example.com',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    expect(() => client.companies.list()).toThrow('requires OAuth bearer authentication');
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('throws QuickApiError for failed responses', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ detail: 'bad request' }),
    });

    const client = createQuickClient({
      apiToken: 'token',
      baseUrl: 'https://api.example.com',
      fetchFn: fetchFn as unknown as typeof fetch,
    });

    await expect(client.expenses.listV1()).rejects.toThrow('QUiCK API request failed (400)');
  });
});
