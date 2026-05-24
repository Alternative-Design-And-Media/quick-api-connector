import type { BodyFor, QueryFor, ResponseFor } from './client.js';
import type { QuickClient } from './client.js';
import type { ExpenseV1Fields, ExpenseV2Fields } from './types/index.js';

export type ListExpensesV1Params = QueryFor<'/1/expenses', 'get'>;
export type ListExpensesV2Params = QueryFor<'/2/expenses', 'get'>;
export type UpdateExpenseV2Body = BodyFor<'/2/expenses/{expense_id}/update', 'patch'>;
export type SearchExpenseArtifactBody = BodyFor<'/2/expenses/artifact-search', 'post'>;
export type CreateExpensesBody = BodyFor<'/2/expenses/create', 'post'>;

const withFields = <T extends { fields?: string }>(
  fields: string[] | undefined,
): T | undefined => (fields ? ({ fields: fields.join(',') } as T) : undefined);

export class ExpensesApi {
  constructor(private readonly client: QuickClient) {}

  public listV1(params?: ListExpensesV1Params): Promise<ResponseFor<'/1/expenses', 'get'>> {
    return this.client.requestEndpoint('/1/expenses', 'get', '/1/expenses', { query: params });
  },

  public listV2(params?: ListExpensesV2Params): Promise<ResponseFor<'/2/expenses', 'get'>> {
    return this.client.requestEndpoint('/2/expenses', 'get', '/2/expenses', { query: params });
  },

  public getV1(expenseId: number, fields?: ExpenseV1Fields[]): Promise<ResponseFor<'/1/expenses/{expense_id}', 'get'>> {
    return this.client.requestEndpoint('/1/expenses/{expense_id}', 'get', `/1/expenses/${expenseId}`, {
      query: withFields<QueryFor<'/1/expenses/{expense_id}', 'get'>>(fields),
    });
  },

  public getV2(expenseId: number, fields?: ExpenseV2Fields[]): Promise<ResponseFor<'/2/expenses/{expense_id}', 'get'>> {
    return this.client.requestEndpoint('/2/expenses/{expense_id}', 'get', `/2/expenses/${expenseId}`, {
      query: withFields<QueryFor<'/2/expenses/{expense_id}', 'get'>>(fields),
    });
  },

  public updateV2(expenseId: number, body: UpdateExpenseV2Body): Promise<ResponseFor<'/2/expenses/{expense_id}/update', 'patch'>> {
    return this.client.requestEndpoint('/2/expenses/{expense_id}/update', 'patch', `/2/expenses/${expenseId}/update`, { body });
  },

  public searchArtifact(body: SearchExpenseArtifactBody): Promise<ResponseFor<'/2/expenses/artifact-search', 'post'>> {
    return this.client.requestEndpoint('/2/expenses/artifact-search', 'post', '/2/expenses/artifact-search', { body });
  },

  public create(body: CreateExpensesBody): Promise<ResponseFor<'/2/expenses/create', 'post'>> {
    return this.client.requestEndpoint('/2/expenses/create', 'post', '/2/expenses/create', { body });
  },

  public bulkAcceptQuarantine(ids: number[]): Promise<ResponseFor<'/1/expenses/quarantine-accept', 'post'>> {
    return this.client.requestEndpoint('/1/expenses/quarantine-accept', 'post', '/1/expenses/quarantine-accept', { body: { ids } });
  },

  public bulkApprove(ids: number[]): Promise<ResponseFor<'/1/expenses/approve', 'post'>> {
    return this.client.requestEndpoint('/1/expenses/approve', 'post', '/1/expenses/approve', { body: { ids } });
  },

  public bulkUnapprove(ids: number[]): Promise<ResponseFor<'/1/expenses/unapprove', 'post'>> {
    return this.client.requestEndpoint('/1/expenses/unapprove', 'post', '/1/expenses/unapprove', { body: { ids } });
  },

  public bulkCheck(ids: number[]): Promise<ResponseFor<'/1/expenses/check', 'post'>> {
    return this.client.requestEndpoint('/1/expenses/check', 'post', '/1/expenses/check', { body: { ids } });
  },

  public bulkUncheck(ids: number[]): Promise<ResponseFor<'/1/expenses/uncheck', 'post'>> {
    return this.client.requestEndpoint('/1/expenses/uncheck', 'post', '/1/expenses/uncheck', { body: { ids } });
  },

  public bulkExport(ids: number[]): Promise<ResponseFor<'/1/expenses/export', 'post'>> {
    return this.client.requestEndpoint('/1/expenses/export', 'post', '/1/expenses/export', { body: { ids } });
  }
}
