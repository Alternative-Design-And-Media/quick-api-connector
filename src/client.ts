import type { paths } from './types/generated.js';
import { AccountingApi } from './accounting.js';
import { ArtifactsApi } from './artifacts.js';
import { CompaniesApi } from './companies.js';
import { DocumentsApi } from './documents.js';
import { ExpensesApi } from './expenses.js';
import { IncomesApi } from './incomes.js';
import { MiscApi } from './misc.js';
import { SalariesApi } from './salaries.js';
import { TagsApi } from './tags.js';
import { TaxesApi } from './taxes.js';

export const QUICK_DEFAULT_BASE_URL = 'https://api.quick.local';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type ApiPath = keyof paths;

type Operation<P extends ApiPath, M extends HttpMethod> = NonNullable<paths[P][M]>;
type ParamsOf<T> = T extends { parameters: infer R } ? R : never;
type QueryOf<T> = ParamsOf<T> extends { query?: infer Q } ? Q : never;
type BodyOf<T> = T extends { requestBody?: { content: { 'application/json': infer B } } } ? B : never;
type JsonContent<T> = T extends { content: { 'application/json': infer R } } ? R : void;
type ResponsesOf<T> = T extends { responses: infer R } ? R : never;

type SuccessResponse<R> =
  200 extends keyof R ? JsonContent<R[200]> :
  201 extends keyof R ? JsonContent<R[201]> :
  202 extends keyof R ? JsonContent<R[202]> :
  204 extends keyof R ? void :
  unknown;

export type QueryFor<P extends ApiPath, M extends HttpMethod> = QueryOf<Operation<P, M>>;
export type BodyFor<P extends ApiPath, M extends HttpMethod> = BodyOf<Operation<P, M>>;
export type ResponseFor<P extends ApiPath, M extends HttpMethod> = SuccessResponse<ResponsesOf<Operation<P, M>>>;

interface QuickTokenAuthConfig {
  apiToken: string;
  bearerToken?: never;
  companyId?: string;
}

interface QuickOAuthConfig {
  apiToken?: never;
  bearerToken: string;
  companyId: string;
}

export type QuickClientConfig = (QuickTokenAuthConfig | QuickOAuthConfig) & {
  baseUrl?: string;
  fetchFn?: typeof fetch;
};

export class QuickApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = 'QuickApiError';
  }
}

export class QuickClient {
  private readonly fetchFn: typeof fetch;
  private readonly baseUrl: string;
  public readonly expenses: ExpensesApi;
  public readonly incomes: IncomesApi;
  public readonly artifacts: ArtifactsApi;
  public readonly documents: DocumentsApi;
  public readonly accounting: AccountingApi;
  public readonly companies: CompaniesApi;
  public readonly taxes: TaxesApi;
  public readonly salaries: SalariesApi;
  public readonly tags: TagsApi;
  public readonly misc: MiscApi;

  constructor(private readonly config: QuickClientConfig) {
    this.fetchFn = config.fetchFn ?? globalThis.fetch.bind(globalThis);
    this.baseUrl = this.normalizeBaseUrl(config.baseUrl ?? QUICK_DEFAULT_BASE_URL);
    this.expenses = new ExpensesApi(this);
    this.incomes = new IncomesApi(this);
    this.artifacts = new ArtifactsApi(this);
    this.documents = new DocumentsApi(this);
    this.accounting = new AccountingApi(this);
    this.companies = new CompaniesApi(this);
    this.taxes = new TaxesApi(this);
    this.salaries = new SalariesApi(this);
    this.tags = new TagsApi(this);
    this.misc = new MiscApi(this);
  }

  public requestEndpoint<P extends ApiPath, M extends HttpMethod>(
    endpointPath: P,
    method: M,
    runtimePath: string,
    options?: {
      query?: QueryFor<P, M> | undefined;
      body?: BodyFor<P, M> | undefined;
    },
  ): Promise<ResponseFor<P, M>> {
    return this.request<ResponseFor<P, M>>(runtimePath, method.toUpperCase(), options?.query, options?.body);
  }

  public isOAuthMode(): boolean {
    return 'bearerToken' in this.config;
  }

  public assertOAuthOnly(endpointName: string): void {
    if (!this.isOAuthMode()) {
      throw new Error(`${endpointName} requires OAuth bearer authentication.`);
    }
  }

  private normalizeBaseUrl(baseUrl: string): string {
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private buildHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if ('bearerToken' in this.config) {
      headers.Authorization = `Bearer ${this.config.bearerToken}`;
      if (this.config.companyId) {
        headers['Quick-Company-Id'] = this.config.companyId;
      }
    } else {
      headers.Authorization = `Token ${this.config.apiToken}`;
      if (this.config.companyId) {
        headers['Quick-Company-Id'] = this.config.companyId;
      }
    }

    return headers;
  }

  private toQueryString(query: unknown): string {
    if (!query || typeof query !== 'object') {
      return '';
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          if (item !== undefined && item !== null) {
            params.append(key, String(item));
          }
        }
        continue;
      }

      params.append(key, String(value));
    }

    const encoded = params.toString();
    return encoded.length > 0 ? `?${encoded}` : '';
  }

  private async request<T>(
    runtimePath: string,
    method: string,
    query?: unknown,
    body?: unknown,
  ): Promise<T> {
    const init: RequestInit = {
      method,
      headers: this.buildHeaders(),
    };
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }

    const response = await this.fetchFn(`${this.baseUrl}${runtimePath}${this.toQueryString(query)}`, init);

    if (!response.ok) {
      const text = await response.text();
      let parsed: unknown = text;

      if (text) {
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
      }

      throw new QuickApiError(`QUiCK API request failed (${response.status})`, response.status, parsed);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}

export const createQuickClient = (config: QuickClientConfig): QuickClient => new QuickClient(config);
export const createQuickApiClient = createQuickClient;
