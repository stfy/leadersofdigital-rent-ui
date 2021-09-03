const baseUrl = process.env.API_URL || window.location.origin;

interface HttpClientOptions extends RequestInit {
    baseUrl: string;
    timeout: number;
}

type HttpMiddleware = (req: HttpRequest) => Promise<HttpRequest> | HttpRequest;

class HttpRequest {
    method: string;
    body: any | null;
    path: string;
    headers: Headers;
    params: Record<string, string | number | boolean>;
}

interface HttpClient {
    options: HttpClientOptions;
    middlewares: HttpMiddleware[];

    use(...middlewares: HttpMiddleware[]): void;

    get<Resp>(path: string, options?: HttpRequest): Promise<Resp>

    post<Resp, Body = any>(path: string, body: Body, options?: HttpRequest): Promise<Resp>

    put<Resp, Body = any>(path: string, body: Body, options?: HttpRequest): Promise<Resp>

    patch<Resp, Body = any>(path: string, body: Body, options?: HttpRequest): Promise<Resp>
}

export const http: HttpClient = client.call({} as HttpClient, ({
    baseUrl: baseUrl,
    timeout: 5000,
}))


function client(this: HttpClient, options: HttpClientOptions): HttpClient {
    this.options = options;
    this.middlewares = []

    const requestFactory = (method: string) => {
        return async (path: string, ...args: any[]) => {
            const req = new HttpRequest();
            const controller = new AbortController()

            const timeoutId = setTimeout(() => controller.abort(), 5000)

            const {baseUrl, headers, body, method: _, ...fetchConfig} = this.options
            const requestOptions: HttpRequest = args[0] instanceof HttpRequest
                ? args[0]
                : args[1] || {};

            req.method = method;

            req.headers = new Headers();
            [this.options.headers as HttpRequest['headers'], requestOptions.headers]
                .forEach((h) => applyHeaders((req.headers as Headers), h))

            if (method.toLowerCase() === 'post') {
                req.body = JSON.stringify(args[0] || null);
            }

            req.path = path;
            req.params = requestOptions.params;

            for (const middleware of this.middlewares) {
                try {
                    await middleware(req)
                } catch (e) {
                    console.log('error=', e)

                    return Promise.reject(new Error(e))
                }
            }

            const requestInit: RequestInit = {
                headers: req.headers,
                body: req.body,
                signal: controller.signal,
                ...fetchConfig,
                method: req.method
            }

            return fetch(prepareUrl(req.path, req.params || {}, baseUrl), requestInit)
                .then(async response => {
                    if (response.ok) {
                        return await response.json()
                    } else {
                        const errorMessage = await response.text()
                        return Promise.reject(new Error(errorMessage))
                    }
                })
        }
    }

    this.get = requestFactory('get',)
    this.post = requestFactory('post')

    this.use = (...middlewares) => this.middlewares = [...this.middlewares, ...middlewares]

    return this;
}

function encodeUrlParams(params: object): string {
    return Object.entries(params)
        .map(p => p.map(encodeURIComponent).join('='))
        .join('&');
}

function prepareUrl(path: string, params: { [key: string]: string | number | boolean }, baseUrl?: string): string {
    let uri = `${baseUrl}${path}`;

    if (Object.keys(params).length > 0) {
        uri += '?'
        uri += encodeUrlParams(params);
    }

    return uri;
}

function applyHeaders(current: Headers, next: Headers | string[][] | Record<string, string>) {
    if (next instanceof Headers) {
        next.forEach((k, v) => {
            current.set(v, k)
        })
    }

    if (Array.isArray(next)) {
        next.forEach(([k, v]) => {
            current.set(k, v)
        })
    }

    if (typeof next === 'object' && !(next instanceof Headers)) {
        Object.entries(next).forEach(([k, v]) => {
            current.set(k, v)
        })
    }

    return current
}


