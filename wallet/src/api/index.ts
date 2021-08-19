
export async function client(endpoint: string, { body, ...customConfig }: { [key: string]: any } = {}) {

    const headers = { 'Content-Type': 'application/json' }

    const config: { [key: string]: any } = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    let data
    try {
        const API_HOST = process.env.API_HOST || 'https://wallet.trackback.dev';
        // const API_HOST = process.env.API_HOST || 'http://localhost:8080';
        const url = (endpoint.indexOf('http') >= 0) ? endpoint : `${API_HOST}${endpoint}`;

        const response = await fetch(url, config)
        data = await response.json()
        if (response.ok) {
            return data
        }
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = function (endpoint: string, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint: string, body: { [key: string]: any }, customConfig = {}) {
    return client(endpoint, { ...customConfig, body })
}
