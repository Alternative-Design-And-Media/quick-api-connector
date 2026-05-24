# quick-api-connector

0.1.0

Type-safe TypeScript connector for the QUiCK API (`v1` + `v2`) with native `fetch`, Cloudflare Worker compatibility, and strict endpoint typing derived from `api.json`.

## Installation

```bash
npm install @alternative-design-and-media/quick-api-connector
```

## Quick start

```ts
import { createQuickClient } from '@alternative-design-and-media/quick-api-connector';

const client = createQuickClient({
  apiToken: process.env.QUICK_API_TOKEN!,
  companyId: process.env.QUICK_COMPANY_ID,
  baseUrl: 'https://api.quick.local',
});

const expenses = await client.expenses.listV1({ page: 1, page_size: 50 });
const expense = await client.expenses.getV2(123, ['items', 'post_its']);
```

## Authentication

### API Token

```ts
createQuickClient({
  apiToken: 'your-api-token',
  companyId: 'optional-company-id',
});
```

Sends:

- `Authorization: Token <apiToken>`
- `Quick-Company-Id: <companyId>` (if provided)

### OAuth2 Bearer

```ts
createQuickClient({
  bearerToken: 'oauth-access-token',
  companyId: 'required-company-id',
});
```

Sends:

- `Authorization: Bearer <bearerToken>`
- `Quick-Company-Id: <companyId>`

OAuth-only endpoints:

- `client.companies.list()`
- `client.companies.getUserProfile()`

## Pagination

- `v1` list endpoints return `{ count, next, previous, results }` and accept `page` / `page_size`.
- `v2` list endpoints return cursor-style responses with `next` / `previous` links and collection results.

## API reference

### Expenses

| Method | HTTP | Path | Description |
| --- | --- | --- | --- |
| `client.expenses.listV1` | GET | `/1/expenses` | List expenses (v1) |
| `client.expenses.listV2` | GET | `/2/expenses` | List expenses (v2) |
| `client.expenses.getV1` | GET | `/1/expenses/{expense_id}` | Expense detail (v1) |
| `client.expenses.getV2` | GET | `/2/expenses/{expense_id}` | Expense detail (v2) |
| `client.expenses.updateV2` | PATCH | `/2/expenses/{expense_id}/update` | Update expense |
| `client.expenses.searchArtifact` | POST | `/2/expenses/artifact-search` | Artifact search |
| `client.expenses.create` | POST | `/2/expenses/create` | Create expenses |
| `client.expenses.bulkAcceptQuarantine` | POST | `/1/expenses/quarantine-accept` | Accept quarantine expenses |
| `client.expenses.bulkApprove` | POST | `/1/expenses/approve` | Approve expenses |
| `client.expenses.bulkUnapprove` | POST | `/1/expenses/unapprove` | Unapprove expenses |
| `client.expenses.bulkCheck` | POST | `/1/expenses/check` | Mark checked |
| `client.expenses.bulkUncheck` | POST | `/1/expenses/uncheck` | Mark unchecked |
| `client.expenses.bulkExport` | POST | `/1/expenses/export` | Mark exported |

### Incomes & Artifacts

| Method | HTTP | Path |
| --- | --- | --- |
| `client.incomes.list` | GET | `/1/incomes` |
| `client.incomes.get` | GET | `/1/incomes/{income_id}` |
| `client.artifacts.getExpense` | POST | `/1/artifacts/expense` |
| `client.artifacts.getIncome` | POST | `/1/artifacts/income` |

### Documents

`client.documents.list`, `client.documents.listFiles`, `client.documents.listTypes`, `client.documents.get`, `client.documents.update`, `client.documents.create`, `client.documents.delete`, `client.documents.attach`, `client.documents.detach`, `client.documents.search`

### Accounting

`client.accounting.ledgerNumbers.list`, `client.accounting.ledgerNumbers.create`, `client.accounting.ledgerNumbers.update`, `client.accounting.ledgerNumbers.delete`, `client.accounting.vatCategories.list`, `client.accounting.vatCategories.create`, `client.accounting.vatCategories.update`, `client.accounting.vatCategories.delete`

### Taxes

`client.taxes.listCodes`, `client.taxes.listMonthlyV1`, `client.taxes.listMonthlyV2`, `client.taxes.createV1`, `client.taxes.createV2`, `client.taxes.updateV1`, `client.taxes.updateV2`, `client.taxes.deleteV1`, `client.taxes.deleteV2`

### Salaries

`client.salaries.listMonthlyV1`, `client.salaries.listMonthlyV2`, `client.salaries.createV1`, `client.salaries.createV2`, `client.salaries.updateV1`, `client.salaries.updateV2`, `client.salaries.deleteV1`, `client.salaries.deleteV2`

### Companies, tags, and misc

- Companies: `client.companies.list`, `client.companies.getUserProfile`
- Tags: `client.tags.list`, `client.tags.create`, `client.tags.update`, `client.tags.delete`
- Misc: `client.misc.partners`, `client.misc.accounts`, `client.misc.payments`, `client.misc.pulse`, `client.misc.uploadAuditXml`, `client.misc.companyInfo.get`, `client.misc.companyInfo.update`

## Scripts

- `npm run typecheck`
- `npm test`
- `npm run build`
