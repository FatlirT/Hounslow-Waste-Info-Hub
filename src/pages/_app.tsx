import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "animate.css";
import "@/styles/style.css";
import "@aws-amplify/ui-react/styles.css";
import "@/styles/ampl.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="page">
      <Component {...pageProps} />
    </div>
  );
}
