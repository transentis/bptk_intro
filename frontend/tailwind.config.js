module.exports = {
	purge: {
		content: [
			'./pages/**/*.{js,ts,jsx,tsx}',
			'./node_modules/@transentis/bptk-widgets/build/**/*.{js,ts,jsx,tsx}',
		],
		options: {
			safelist: [
				/data-theme$/,
				/primary$/,
				/secondary$/,
				/accent$/,
				/link$/,
			],
		},
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			transentis: ['Open Sans'],
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a: {
							color: 'hsl(var(--p)) !important',
							'&:link': {
								color: 'hsl(var(--p)) !important',
							},
							'&:visited': {
								color: 'hsl(var(--p)) !important',
							},
							'&:hover': {
								color: 'hsl(var(--pf)) !important',
							},
							'&:active': {
								color: 'hsl(var(--pf)) !important',
							},
						},
					},
				},
			}),
		},
		height: {
			'10percent': '10%',
			'55percent': '55%',
			'90percent': '90%',
		},
		opacity: {
			95: '0.95',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
}
