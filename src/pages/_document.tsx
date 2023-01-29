import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
        <div id='modal'></div>
        <Script src='/theme.js' strategy='beforeInteractive' />
      </body>
    </Html>
  );
}
