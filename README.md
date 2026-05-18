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

const expenses = await client.listExpensesV1({ page: 1, page_size: 50 });
const expense = await client.getExpenseV2(123, ['items', 'post_its']);
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

- `listCompanies()`
- `getUserProfile()`

## Pagination

- `v1` list endpoints return `{ count, next, previous, results }` and accept `page` / `page_size`.
- `v2` list endpoints return cursor-style responses with `next` / `previous` links and collection results.

## API reference

### Expenses

| Method | HTTP | Path | Description |
| --- | --- | --- | --- |
| `listExpensesV1` | GET | `/1/expenses` | List expenses (v1) |
| `listExpensesV2` | GET | `/2/expenses` | List expenses (v2) |
| `getExpenseV1` | GET | `/1/expenses/{expense_id}` | Expense detail (v1) |
| `getExpenseV2` | GET | `/2/expenses/{expense_id}` | Expense detail (v2) |
| `updateExpenseV2` | PATCH | `/2/expenses/{expense_id}/update` | Update expense |
| `searchExpenseArtifact` | POST | `/2/expenses/artifact-search` | Artifact search |
| `createExpenses` | POST | `/2/expenses/create` | Create expenses |
| `bulkAcceptQuarantine` | POST | `/1/expenses/quarantine-accept` | Accept quarantine expenses |
| `bulkApproveExpenses` | POST | `/1/expenses/approve` | Approve expenses |
| `bulkUnapproveExpenses` | POST | `/1/expenses/unapprove` | Unapprove expenses |
| `bulkCheckExpenses` | POST | `/1/expenses/check` | Mark checked |
| `bulkUncheckExpenses` | POST | `/1/expenses/uncheck` | Mark unchecked |
| `bulkExportExpenses` | POST | `/1/expenses/export` | Mark exported |

### Incomes & Artifacts

| Method | HTTP | Path |
| --- | --- | --- |
| `listIncomes` | GET | `/1/incomes` |
| `getIncome` | GET | `/1/incomes/{income_id}` |
| `getExpenseArtifacts` | POST | `/1/artifacts/expense` |
| `getIncomeArtifacts` | POST | `/1/artifacts/income` |

### Documents

`listDocuments`, `listDocumentFiles`, `listDocumentTypes`, `getDocument`, `updateDocument`, `createDocuments`, `deleteDocuments`, `attachDocuments`, `detachDocuments`, `searchDocument`

### Accounting

`listLedgerNumbers`, `createLedgerNumbers`, `updateLedgerNumber`, `deleteLedgerNumbers`, `listVatCategories`, `createVatCategories`, `updateVatCategory`, `deleteVatCategories`

### Taxes

`listTaxCodes`, `listMonthlyTaxesV1`, `listMonthlyTaxesV2`, `createTaxesV1`, `createTaxesV2`, `updateTaxesV1`, `updateTaxesV2`, `deleteTaxesV1`, `deleteTaxesV2`

### Salaries

`listMonthlySalariesV1`, `listMonthlySalariesV2`, `createSalariesV1`, `createSalariesV2`, `updateSalariesV1`, `updateSalariesV2`, `deleteSalariesV1`, `deleteSalariesV2`

### Companies, tags, and misc

- Companies: `listCompanies`, `getUserProfile`
- Tags: `listTags`, `createTags`, `updateTags`, `deleteTags`
- Misc: `listPartners`, `listAccounts`, `listPayments`, `pulse`, `uploadAuditXml`, `getCompanyInfo`, `updateCompanyInfo`

## Scripts

- `npm run typecheck`
- `npm test`
- `npm run build`
