import type { paths } from './generated.js';

type Operation<P extends keyof paths, M extends 'get' | 'post' | 'patch'> = NonNullable<paths[P][M]>;
type JsonBody<T> = T extends { requestBody?: { content: { 'application/json': infer B } } } ? B : never;
type JsonResponse<T> = T extends { responses: { 200: { content: { 'application/json': infer R } } } } ? R : never;

export enum PaidStatus {
  NOT_PAID = 1,
  PAID = 2,
  PARTIALLY_PAID = 3,
}

export type PaymentMethod = 'transfer' | 'cash' | 'card' | 'cod';

export type NamedEntity = {
  id: number;
  name: string;
};

export type VatInfo = {
  id: number;
  name: string;
  percent: number;
};

export type ExpenseV1Fields = 'items' | 'payment_history' | 'accounting';
export type ExpenseV2Fields = ExpenseV1Fields | 'post_its';
export type IncomeFields = 'items' | 'payment_history';
export type DocumentFields = 'details' | 'attached';

export type ExpenseDetailV1 = JsonResponse<Operation<'/1/expenses/{expense_id}', 'get'>>;
export type IncomeDetail = JsonResponse<Operation<'/1/incomes/{income_id}', 'get'>>;
export type ExpenseCreateRequest = JsonBody<Operation<'/2/expenses/create', 'post'>>;
export type DocumentCreateRequest = JsonBody<Operation<'/2/documents/create', 'post'>>;

export type Tag = JsonResponse<Operation<'/2/tags', 'get'>>;
export type SimpleTag = NonNullable<ExpenseDetailV1['simple_tags']>[number];

export type ExpenseAssignment = NonNullable<ExpenseDetailV1['assignments']>[number];
export type IncomeAssignment = NonNullable<IncomeDetail['assignments']>[number];

export type ArtifactInfo = unknown;

export type PaginatedResponseV1<T> = {
  count?: number;
  next?: string;
  previous?: string;
  results?: T[];
};

export type CursorPaginatedResponseV2<T> = {
  next?: string;
  previous?: string;
  results?: T[];
};

export type { paths } from './generated.js';
