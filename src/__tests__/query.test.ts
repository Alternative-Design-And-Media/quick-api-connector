import { describe, expect, it } from 'vitest';

import { documentsQuery, expensesQuery, incomesQuery } from '../query.js';
import { PaidStatus } from '../types/index.js';

describe('query helpers', () => {
  it('builds expenses filters and sort with fluent helpers', () => {
    const query = expensesQuery()
      .startingAfter('2025-01-01')
      .withPaidStatus(PaidStatus.PAID)
      .sortByCreated('desc')
      .page(1)
      .pageSize(50)
      .build();

    expect(query).toEqual({
      from_date: '2025-01-01',
      paid_status: 2,
      ordering: '-created',
      page: 1,
      page_size: 50,
    });
  });

  it('supports generic filter assignment for incomes', () => {
    const query = incomesQuery()
      .where('payment_method', 'transfer')
      .whereMany({
        partner: 'ACME',
        to_date: '2025-12-31',
      })
      .sortByDueDate('asc')
      .build();

    expect(query).toEqual({
      payment_method: 'transfer',
      partner: 'ACME',
      to_date: '2025-12-31',
      ordering: 'due_at',
    });
  });

  it('serializes fields and ordering for documents', () => {
    const query = documentsQuery()
      .fields(['details', 'attached'])
      .withSearch('invoice')
      .withTagId(10)
      .sortByCreated('desc')
      .build();

    expect(query).toEqual({
      fields: 'details,attached',
      search: 'invoice',
      with_tag_ids: 10,
      ordering: '-created_at',
    });
  });
});
