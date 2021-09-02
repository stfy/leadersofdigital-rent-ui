import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import replace from '@rollup/plugin-replace';

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
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
