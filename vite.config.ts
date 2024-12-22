import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
/* export default defineConfig({
  plugins: [react()],
})
 */

export default defineConfig({
	base: '/', // Название вашего репозитория
	build: {
		outDir: 'dist',
	},
	plugins: [react()],
})