import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    );
}

export default MyApp;
