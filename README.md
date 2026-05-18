# quick-api-connector

TypeScript-first npm API connector base library.

## Installation

```bash
npm install @alternative-design-and-media/quick-api-connector
```

## Usage

```ts
import { createQuickApiClient } from '@alternative-design-and-media/quick-api-connector';

const api = createQuickApiClient({
  baseUrl: 'api.example.com',
  token: process.env.API_TOKEN,
});

const users = await api.get<{ data: Array<{ id: string; name: string }> }>('/users', {
  query: { page: 1 },
});
```

## Scripts

- `npm run typecheck`
- `npm test`
- `npm run build`
