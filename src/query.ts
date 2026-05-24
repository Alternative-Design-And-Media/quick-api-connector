import type { QueryFor } from './client.js';
import type { PaidStatus } from './types/index.js';

export type QuerySortDirection = 'asc' | 'desc';

export class QuickQueryBuilder<TQuery extends Record<string, unknown>> {
  protected readonly query: Partial<TQuery>;

  constructor(initial?: Partial<TQuery>) {
    this.query = { ...(initial ?? {}) } as Partial<TQuery>;
  }

  public where<TKey extends keyof TQuery>(key: TKey, value: TQuery[TKey]): this {
    if (value === undefined || value === null) {
      delete this.query[key];
      return this;
    }

    this.query[key] = value;
    return this;
  }

  public whereMany(filters: Partial<TQuery>): this {
    for (const [key, value] of Object.entries(filters)) {
      this.where(key as keyof TQuery, value as TQuery[keyof TQuery]);
    }

    return this;
  }

  public fields<T extends TQuery & { fields?: string }>(
    this: QuickQueryBuilder<T>,
    value: string | string[],
  ): this {
    const normalized = Array.isArray(value) ? value.join(',') : value;
    return this.where('fields', normalized);
  }

  public page<T extends TQuery & { page?: number }>(
    this: QuickQueryBuilder<T>,
    value: number,
  ): this {
    return this.where('page', value);
  }

  public pageSize<T extends TQuery & { page_size?: number }>(
    this: QuickQueryBuilder<T>,
    value: number,
  ): this {
    return this.where('page_size', value);
  }

  public orderBy<T extends TQuery & { ordering?: string }>(
    this: QuickQueryBuilder<T>,
    field: string,
    direction: QuerySortDirection = 'asc',
  ): this {
    const ordering = direction === 'desc' ? `-${field}` : field;
    return this.where('ordering', ordering);
  }

  public build(): TQuery {
    return { ...this.query } as TQuery;
  }
}

type ExpensesV1ListQuery = NonNullable<QueryFor<'/1/expenses', 'get'>>;
type IncomesListQuery = NonNullable<QueryFor<'/1/incomes', 'get'>>;
type DocumentsListQuery = NonNullable<QueryFor<'/1/documents', 'get'>>;

export class ExpensesQueryBuilder extends QuickQueryBuilder<ExpensesV1ListQuery> {
  public startingAfter(date: string): this {
    return this.where('from_date', date);
  }

  public startingBefore(date: string): this {
    return this.where('to_date', date);
  }

  public withPaidStatus(status: PaidStatus | number): this {
    return this.where('paid_status', status);
  }

  public withPartner(partner: string): this {
    return this.where('partner', partner);
  }

  public withTag(tag: string): this {
    return this.where('tags', tag);
  }

  public sortByCreated(direction: QuerySortDirection = 'desc'): this {
    return this.orderBy('created', direction);
  }
}

export class IncomesQueryBuilder extends QuickQueryBuilder<IncomesListQuery> {
  public startingAfter(date: string): this {
    return this.where('from_date', date);
  }

  public startingBefore(date: string): this {
    return this.where('to_date', date);
  }

  public withPaidStatus(status: PaidStatus | number): this {
    return this.where('paid_status', status);
  }

  public withPartner(partner: string): this {
    return this.where('partner', partner);
  }

  public sortByDueDate(direction: QuerySortDirection = 'desc'): this {
    return this.orderBy('due_at', direction);
  }
}

export class DocumentsQueryBuilder extends QuickQueryBuilder<DocumentsListQuery> {
  public startingAfter(date: string): this {
    return this.where('from_date', date);
  }

  public startingBefore(date: string): this {
    return this.where('to_date', date);
  }

  public withSearch(value: string): this {
    return this.where('search', value);
  }

  public withTagId(tagId: number): this {
    return this.where('with_tag_ids', tagId);
  }

  public sortByCreated(direction: QuerySortDirection = 'desc'): this {
    return this.orderBy('created_at', direction);
  }
}

export const expensesQuery = (): ExpensesQueryBuilder => new ExpensesQueryBuilder();
export const incomesQuery = (): IncomesQueryBuilder => new IncomesQueryBuilder();
export const documentsQuery = (): DocumentsQueryBuilder => new DocumentsQueryBuilder();
