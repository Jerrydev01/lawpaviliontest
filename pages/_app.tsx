import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/BaseLayout/Header";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
