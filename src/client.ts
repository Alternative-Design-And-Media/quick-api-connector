export interface QuickApiClientConfig {
  baseUrl: string;
  token?: string;
  fetchFn?: typeof fetch;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface QuickApiClient {
  request<T>(path: string, options?: RequestOptions): Promise<T>;
  get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
  post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
}

const toQueryString = (query: RequestOptions['query']): string => {
  if (!query) {
    return '';
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

const trimSlashes = (value: string): string => {
  let start = 0;
  let end = value.length;

  while (start < end && value[start] === '/') {
    start += 1;
  }

  while (end > start && value[end - 1] === '/') {
    end -= 1;
  }

  return value.slice(start, end);
};

const createUrl = (baseUrl: string, path: string, query?: RequestOptions['query']): string => {
  const normalizedBase = baseUrl.startsWith('http://') || baseUrl.startsWith('https://')
    ? trimSlashes(baseUrl)
    : `https://${trimSlashes(baseUrl)}`;
  const normalizedPath = trimSlashes(path);

  return `${normalizedBase}/${normalizedPath}${toQueryString(query)}`;
};

export const createQuickApiClient = (config: QuickApiClientConfig): QuickApiClient => {
  const fetchFn = config.fetchFn ?? fetch;

  const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
    const requestInit: RequestInit = {
      method: options.method ?? 'GET',
      headers: {
        ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (options.body !== undefined) {
      requestInit.body = JSON.stringify(options.body);
    }

    const response = await fetchFn(createUrl(config.baseUrl, path, options.query), requestInit);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
  };

  return {
    request,
    get: (path, options) => request(path, { ...options, method: 'GET' }),
    post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  };
};
