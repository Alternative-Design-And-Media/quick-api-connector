import type { BodyFor, QueryFor, QuickClient, ResponseFor } from './client.js';
import type { ExpenseV1Fields, ExpenseV2Fields } from './types/index.js';

export type ListExpensesV1Params = QueryFor<'/1/expenses', 'get'>;
export type ListExpensesV2Params = QueryFor<'/2/expenses', 'get'>;
export type UpdateExpenseV2Body = BodyFor<'/2/expenses/{expense_id}/update', 'patch'>;
export type SearchExpenseArtifactBody = BodyFor<'/2/expenses/artifact-search', 'post'>;
export type CreateExpensesBody = BodyFor<'/2/expenses/create', 'post'>;

export interface ExpensesApi {
  listExpensesV1(params?: ListExpensesV1Params): Promise<ResponseFor<'/1/expenses', 'get'>>;
  listExpensesV2(params?: ListExpensesV2Params): Promise<ResponseFor<'/2/expenses', 'get'>>;
  getExpenseV1(expenseId: number, fields?: ExpenseV1Fields[]): Promise<ResponseFor<'/1/expenses/{expense_id}', 'get'>>;
  getExpenseV2(expenseId: number, fields?: ExpenseV2Fields[]): Promise<ResponseFor<'/2/expenses/{expense_id}', 'get'>>;
  updateExpenseV2(expenseId: number, body: UpdateExpenseV2Body): Promise<ResponseFor<'/2/expenses/{expense_id}/update', 'patch'>>;
  searchExpenseArtifact(body: SearchExpenseArtifactBody): Promise<ResponseFor<'/2/expenses/artifact-search', 'post'>>;
  createExpenses(body: CreateExpensesBody): Promise<ResponseFor<'/2/expenses/create', 'post'>>;
  bulkAcceptQuarantine(ids: number[]): Promise<ResponseFor<'/1/expenses/quarantine-accept', 'post'>>;
  bulkApproveExpenses(ids: number[]): Promise<ResponseFor<'/1/expenses/approve', 'post'>>;
  bulkUnapproveExpenses(ids: number[]): Promise<ResponseFor<'/1/expenses/unapprove', 'post'>>;
  bulkCheckExpenses(ids: number[]): Promise<ResponseFor<'/1/expenses/check', 'post'>>;
  bulkUncheckExpenses(ids: number[]): Promise<ResponseFor<'/1/expenses/uncheck', 'post'>>;
  bulkExportExpenses(ids: number[]): Promise<ResponseFor<'/1/expenses/export', 'post'>>;
}

const withFields = <T extends { fields?: string }>(
  fields: string[] | undefined,
): T | undefined => (fields ? ({ fields: fields.join(',') } as T) : undefined);

export const expensesMethods: ExpensesApi = {
  listExpensesV1(this: QuickClient, params) {
    return this.requestEndpoint('/1/expenses', 'get', '/1/expenses', { query: params });
  },

  listExpensesV2(this: QuickClient, params) {
    return this.requestEndpoint('/2/expenses', 'get', '/2/expenses', { query: params });
  },

  getExpenseV1(this: QuickClient, expenseId, fields) {
    return this.requestEndpoint('/1/expenses/{expense_id}', 'get', `/1/expenses/${expenseId}`, {
      query: withFields<QueryFor<'/1/expenses/{expense_id}', 'get'>>(fields),
    });
  },

  getExpenseV2(this: QuickClient, expenseId, fields) {
    return this.requestEndpoint('/2/expenses/{expense_id}', 'get', `/2/expenses/${expenseId}`, {
      query: withFields<QueryFor<'/2/expenses/{expense_id}', 'get'>>(fields),
    });
  },

  updateExpenseV2(this: QuickClient, expenseId, body) {
    return this.requestEndpoint('/2/expenses/{expense_id}/update', 'patch', `/2/expenses/${expenseId}/update`, { body });
  },

  searchExpenseArtifact(this: QuickClient, body) {
    return this.requestEndpoint('/2/expenses/artifact-search', 'post', '/2/expenses/artifact-search', { body });
  },

  createExpenses(this: QuickClient, body) {
    return this.requestEndpoint('/2/expenses/create', 'post', '/2/expenses/create', { body });
  },

  bulkAcceptQuarantine(this: QuickClient, ids) {
    return this.requestEndpoint('/1/expenses/quarantine-accept', 'post', '/1/expenses/quarantine-accept', { body: { ids } });
  },

  bulkApproveExpenses(this: QuickClient, ids) {
    return this.requestEndpoint('/1/expenses/approve', 'post', '/1/expenses/approve', { body: { ids } });
  },

  bulkUnapproveExpenses(this: QuickClient, ids) {
    return this.requestEndpoint('/1/expenses/unapprove', 'post', '/1/expenses/unapprove', { body: { ids } });
  },

  bulkCheckExpenses(this: QuickClient, ids) {
    return this.requestEndpoint('/1/expenses/check', 'post', '/1/expenses/check', { body: { ids } });
  },

  bulkUncheckExpenses(this: QuickClient, ids) {
    return this.requestEndpoint('/1/expenses/uncheck', 'post', '/1/expenses/uncheck', { body: { ids } });
  },

  bulkExportExpenses(this: QuickClient, ids) {
    return this.requestEndpoint('/1/expenses/export', 'post', '/1/expenses/export', { body: { ids } });
  },
};
