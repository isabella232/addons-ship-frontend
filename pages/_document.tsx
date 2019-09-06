import Document, { Html, Head, Main, NextScript, NextDocumentContext } from 'next/document';

export default class ShipDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Generic icons */}
          <link rel="icon" href="/static/icons/favicon-32.png" sizes="32x32" />
          <link rel="icon" href="/static/icons/favicon-57.png" sizes="57x57" />
          <link rel="icon" href="/static/icons/favicon-76.png" sizes="76x76" />
          <link rel="icon" href="/static/icons/favicon-96.png" sizes="96x96" />
          <link rel="icon" href="/static/icons/favicon-128.png" sizes="128x128" />
          <link rel="icon" href="/static/icons/favicon-228.png" sizes="228x228" />

          {/* Android  */}
          <link rel="shortcut icon" sizes="196x196" href="/static/icons/favicon-196.png" />

          {/* iOS */}
          <link rel="apple-touch-icon" href="path/to/favicon-180.png" sizes="180x180" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
