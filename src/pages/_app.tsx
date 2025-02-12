import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { FavoritesProvider } from "@/context/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FavoritesProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</FavoritesProvider>
	);
}

export default MyApp;
