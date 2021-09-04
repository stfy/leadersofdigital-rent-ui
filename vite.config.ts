import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import replace from '@rollup/plugin-replace';

const port = 3000;
const host = process.env.HOST || '0.0.0.0';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),

        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.API_URL': JSON.stringify(process.env.API_URL),
        })
    ],

    server: {
        proxy: {
            '/api/v0/': {
                target: process.env.PROXY_API_URL || 'https://rent.weintegrator.com',
                changeOrigin: true,
                secure: false,
                configure: proxy => {
                    proxy.on('proxyReq', onProxyReq)
                    proxy.on('proxyRes', onProxyRes)
                },
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})

function onProxyRes(proxyResponse: any) {
    if (proxyResponse.headers['set-cookie']) {
        proxyResponse.headers['set-cookie'] = proxyResponse.headers['set-cookie'].map((cookie: string) =>
            cookie.replace(/; (secure|HttpOnly|SameSite=Strict)/gi, '')
        );
    }
}

function onProxyReq(proxyResponse: any, req: any) {
    if (req.headers.cookie) {
        proxyResponse.setHeader('cookie', req.headers.cookie);
    }
}
