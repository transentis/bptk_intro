import React from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'

import '../styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div className='w-full h-full'>
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
