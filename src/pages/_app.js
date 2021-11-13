import '../components/register-components';
import '../css/main.css';
import Head from 'next/head';
import AuthContextProvider from '../contexts/AuthContext';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthContextProvider>
                <Head>
                    <link rel="icon" href="/favicon.svg" />
                </Head>
                <Component {...pageProps} />
            </AuthContextProvider>
        </>
    );
}
