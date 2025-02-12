import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import CharacterList from "@/components/CharacterList/CharacterList";

const HomePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Dragon Ball Catalog</title>
				<meta
					name="description"
					content="Explore Dragon Ball characters"
				/>
			</Head>

			<section>
				<CharacterList />
			</section>
		</>
	);
};

export default HomePage;
