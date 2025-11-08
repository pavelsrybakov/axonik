/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#2563eb',
					dark: '#1e40af',
					light: '#3b82f6',
				},
				secondary: '#10b981',
				accent: '#8b5cf6',
				background: '#f8fafc',
				surface: '#ffffff',
				'text-primary': '#1e293b',
				'text-secondary': '#64748b',
				border: '#e2e8f0',
			},
			keyframes: {
				rotate: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				pulse: {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
					},
					'50%': {
						transform: 'scale(1.1)',
						boxShadow: '0 0 0 20px rgba(255, 255, 255, 0)',
					},
				},
				wave: {
					'0%, 100%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(1.5)' },
				},
				slideIn: {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				typing: {
					'0%, 60%, 100%': {
						transform: 'translateY(0)',
						opacity: '0.7',
					},
					'30%': {
						transform: 'translateY(-10px)',
						opacity: '1',
					},
				},
			},
			animation: {
				rotate: 'rotate 20s linear infinite',
				pulse: 'pulse 2s ease-in-out infinite',
				wave: 'wave 1.5s ease-in-out infinite',
				slideIn: 'slideIn 0.3s ease-out',
				typing: 'typing 1.4s ease-in-out infinite',
				spin: 'spin 1s linear infinite',
			},
		},
	},
	plugins: [],
};
