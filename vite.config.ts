import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			// Proxy for MyMemory API to avoid CORS issues
			'/api/translate': {
				target: 'https://api.mymemory.translated.net',
				changeOrigin: true,
				rewrite: (path) => {
					// Keep query params, just change path to /get
					const queryIndex = path.indexOf('?');
					const query = queryIndex >= 0 ? path.substring(queryIndex) : '';
					return `/get${query}`;
				},
			},
			// Proxy for Hugging Face Inference API to avoid CORS issues
			'/api/hf': {
				target: 'https://router.huggingface.co',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/hf/, '/hf-inference'),
				configure: (proxy) => {
					proxy.on('proxyReq', (proxyReq) => {
						// Add Authorization header if token is available
						const token = process.env.VITE_HF_TOKEN;
						if (token) {
							proxyReq.setHeader('Authorization', `Bearer ${token}`);
						}
					});
				},
			},
		},
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			manifest: {
				name: 'Axonik.ai - Medical AI Assistant',
				short_name: 'Axonik.ai',
				description:
					'Medical AI application for healthcare insights and decision support',
				theme_color: '#2563eb',
				background_color: '#f8fafc',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
				shortcuts: [
					{
						name: 'Chat Assistant',
						short_name: 'Chat',
						description: 'Start a conversation with the AI assistant',
						url: '/?view=chat',
						icons: [{ src: '/icon-192.png', sizes: '192x192' }],
					},
					{
						name: 'OCR Test',
						short_name: 'OCR',
						description: 'Extract text from images',
						url: '/?view=ocr',
						icons: [{ src: '/icon-192.png', sizes: '192x192' }],
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			devOptions: {
				enabled: true,
				type: 'module',
			},
		}),
	],
});
