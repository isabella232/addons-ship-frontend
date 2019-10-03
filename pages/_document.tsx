import Document, { Html, Head, Main, NextScript, NextDocumentContext } from 'next/document';

const isProdMode = process.env.NODE_ENV === 'production';

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

          {/* Hotjar */}
          {isProdMode && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:236822,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
              }}
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
