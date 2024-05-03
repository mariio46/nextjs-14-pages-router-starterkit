import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head />
            <body className='mx-auto max-w-screen-2xl font-sans antialiased'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
