// Based on https://github.com/zeit/next.js/tree/canary/examples/with-react-native-web
// and https://github.com/expo/expo-cli/blob/master/packages/webpack-config/web-default/index.html
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { ServerStyleSheet } from 'styled-components';

import config from '../../app.json';
import envConfig from '../config';
import { fonts } from '../components/global-styles';

export const style = `
  /**
   * Building on the RNWeb reset:
   * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
   */
  html, body, #__next {
    width: 100%;
    /* To smooth any scrolling behavior */
    -webkit-overflow-scrolling: touch;
    margin: 0px;
    padding: 0px;
    /* Allows content to fill the viewport and go beyond the bottom */
    min-height: 100%;
  }
  #__next {
    flex-shrink: 0;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    flex: 1;
  }
  html {
    scroll-behavior: smooth;
    /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
    -webkit-text-size-adjust: 100%;
    height: 100%;
  }
  body {
    display: flex;
    /* Allows you to scroll below the viewport; default value is visible */
    overflow-y: auto;
    overscroll-behavior-y: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: scrollbar;
  }

  /* https://github.com/postcss/postcss-100vh-fix */
  /* Avoid Chrome to see Safari hack */
  @supports (-webkit-touch-callout: none) {
    body {
      /* The hack for Safari */
      height: -webkit-fill-available;
    }
  }
`;

export async function getInitialProps(ctx: DocumentContext) {
  AppRegistry.registerComponent(config.name, () => Main);
  const { getStyleElement } = AppRegistry.getApplication(config.name);

  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      // WARNING: `sheet.getStyleElement()` should be last
      styles: (
        <>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          {initialProps.styles}
          {getStyleElement()}
          {sheet.getStyleElement()}
        </>
      )
    };
  } finally {
    sheet.seal();
  }
}

export class Document extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: fonts }} />
          <link
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="/fonts/Arial Rounded MT Std.woff2"
          />
          <link
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="/fonts/Arial Rounded MT Std Bold.woff2"
          />
          <link
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="/fonts/Arial Rounded MT Std Extra Bold.woff2"
          />
          <link
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="/fonts/Arial Rounded MT Std Light.woff2"
          />
          <link
            as="script"
            type="text/javascript"
            href={envConfig.rudderstack_script_url}
          />

          <link rel="preconnect" href="graphql.poolmessenger.com" />
          <link rel="dns-prefetch" href="graphql.poolmessenger.com" />

          <meta charSet="UTF-8" />
          <meta
            name="google-site-verification"
            content="M0pAtnxUliVGLhgHc_xwlqhQ0OxWxyxJ8zvAiZltNlI"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
