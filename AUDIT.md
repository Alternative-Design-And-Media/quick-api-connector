# Endpoint coverage audit

- Source of truth: `api.json` + `src/*.ts` wrapper implementations
- API endpoints in `api.json`: **65**
- Wrapper endpoint calls in `src/`: **65**
- Missing wrappers: **0**
- Stale/non-existing wrapper endpoints: **0**

## Coverage matrix

| Endpoint | Wrapper method | Status |
| --- | --- | --- |
| `GET /1/accounts` | `client.misc.accounts` | ✅ implementálva |
| `GET /1/documents` | `client.documents.list` | ✅ implementálva |
| `GET /1/documents/files` | `client.documents.listFiles` | ✅ implementálva |
| `GET /1/expenses` | `client.expenses.listV1` | ✅ implementálva |
| `GET /1/expenses/{expense_id}` | `client.expenses.getV1` | ✅ implementálva |
| `GET /1/incomes` | `client.incomes.list` | ✅ implementálva |
| `GET /1/incomes/{income_id}` | `client.incomes.get` | ✅ implementálva |
| `GET /1/monthly-salaries` | `client.salaries.listMonthlyV1` | ✅ implementálva |
| `GET /1/monthly-taxes` | `client.taxes.listMonthlyV1` | ✅ implementálva |
| `GET /1/partners` | `client.misc.partners` | ✅ implementálva |
| `GET /1/payments` | `client.misc.payments` | ✅ implementálva |
| `GET /1/pulse` | `client.misc.pulse` | ✅ implementálva |
| `GET /1/tax-codes` | `client.taxes.listCodes` | ✅ implementálva |
| `GET /2/accounting/ledger-numbers` | `client.accounting.ledgerNumbers.list` | ✅ implementálva |
| `GET /2/accounting/vat-categories` | `client.accounting.vatCategories.list` | ✅ implementálva |
| `GET /2/companies` | `client.companies.list` | ✅ implementálva |
| `GET /2/company-info` | `client.misc.companyInfo.get` | ✅ implementálva |
| `GET /2/document-types` | `client.documents.listTypes` | ✅ implementálva |
| `GET /2/documents/{document_id}` | `client.documents.get` | ✅ implementálva |
| `GET /2/expenses` | `client.expenses.listV2` | ✅ implementálva |
| `GET /2/expenses/{expense_id}` | `client.expenses.getV2` | ✅ implementálva |
| `GET /2/monthly-salaries` | `client.salaries.listMonthlyV2` | ✅ implementálva |
| `GET /2/monthly-taxes` | `client.taxes.listMonthlyV2` | ✅ implementálva |
| `GET /2/tags` | `client.tags.list` | ✅ implementálva |
| `GET /2/user-profile` | `client.companies.getUserProfile` | ✅ implementálva |
| `PATCH /2/company-info/update/{company_id}` | `client.misc.companyInfo.update` | ✅ implementálva |
| `PATCH /2/expenses/{expense_id}/update` | `client.expenses.updateV2` | ✅ implementálva |
| `PATCH /2/tags/update` | `client.tags.update` | ✅ implementálva |
| `POST /1/artifacts/expense` | `client.artifacts.getExpense` | ✅ implementálva |
| `POST /1/artifacts/income` | `client.artifacts.getIncome` | ✅ implementálva |
| `POST /1/documents/attach` | `client.documents.attach` | ✅ implementálva |
| `POST /1/documents/detach` | `client.documents.detach` | ✅ implementálva |
| `POST /1/expenses/approve` | `client.expenses.bulkApprove` | ✅ implementálva |
| `POST /1/expenses/check` | `client.expenses.bulkCheck` | ✅ implementálva |
| `POST /1/expenses/export` | `client.expenses.bulkExport` | ✅ implementálva |
| `POST /1/expenses/quarantine-accept` | `client.expenses.bulkAcceptQuarantine` | ✅ implementálva |
| `POST /1/expenses/unapprove` | `client.expenses.bulkUnapprove` | ✅ implementálva |
| `POST /1/expenses/uncheck` | `client.expenses.bulkUncheck` | ✅ implementálva |
| `POST /1/salaries/create` | `client.salaries.createV1` | ✅ implementálva |
| `POST /1/salaries/delete` | `client.salaries.deleteV1` | ✅ implementálva |
| `POST /1/salaries/update` | `client.salaries.updateV1` | ✅ implementálva |
| `POST /1/taxes/create` | `client.taxes.createV1` | ✅ implementálva |
| `POST /1/taxes/delete` | `client.taxes.deleteV1` | ✅ implementálva |
| `POST /1/taxes/update` | `client.taxes.updateV1` | ✅ implementálva |
| `POST /2/accounting/ledger-numbers/create` | `client.accounting.ledgerNumbers.create` | ✅ implementálva |
| `POST /2/accounting/ledger-numbers/delete` | `client.accounting.ledgerNumbers.delete` | ✅ implementálva |
| `POST /2/accounting/ledger-numbers/update/{ledger_number_id}` | `client.accounting.ledgerNumbers.update` | ✅ implementálva |
| `POST /2/accounting/vat-categories/create` | `client.accounting.vatCategories.create` | ✅ implementálva |
| `POST /2/accounting/vat-categories/delete` | `client.accounting.vatCategories.delete` | ✅ implementálva |
| `POST /2/accounting/vat-categories/update/{company_vat_category_id}` | `client.accounting.vatCategories.update` | ✅ implementálva |
| `POST /2/audit-xml` | `client.misc.uploadAuditXml` | ✅ implementálva |
| `POST /2/documents/create` | `client.documents.create` | ✅ implementálva |
| `POST /2/documents/delete` | `client.documents.delete` | ✅ implementálva |
| `POST /2/documents/search` | `client.documents.search` | ✅ implementálva |
| `POST /2/documents/update/{document_id}` | `client.documents.update` | ✅ implementálva |
| `POST /2/expenses/artifact-search` | `client.expenses.searchArtifact` | ✅ implementálva |
| `POST /2/expenses/create` | `client.expenses.create` | ✅ implementálva |
| `POST /2/salaries/create` | `client.salaries.createV2` | ✅ implementálva |
| `POST /2/salaries/delete` | `client.salaries.deleteV2` | ✅ implementálva |
| `POST /2/salaries/update` | `client.salaries.updateV2` | ✅ implementálva |
| `POST /2/tags/create` | `client.tags.create` | ✅ implementálva |
| `POST /2/tags/delete` | `client.tags.delete` | ✅ implementálva |
| `POST /2/taxes/create` | `client.taxes.createV2` | ✅ implementálva |
| `POST /2/taxes/delete` | `client.taxes.deleteV2` | ✅ implementálva |
| `POST /2/taxes/update` | `client.taxes.updateV2` | ✅ implementálva |

## Wrapper methods pointing to non-existing endpoints

- Nincs ilyen eltérés.
