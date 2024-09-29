import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'https://dummyjson.com', 
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''), 
			},
		},
	},
})