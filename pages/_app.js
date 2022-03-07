import Layout from "../components/Layout";
import AppProvider from "../context/AppProvider";
import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XDF3B8HYV9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XDF3B8HYV9');
        `}
        </Script>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
