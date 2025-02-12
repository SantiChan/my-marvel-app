import React, { useState } from "react";
import { Header } from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Layout.module.scss";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={styles.layoutContainer}>
			<Header />
			<main className={styles.mainContent}>{children}</main>
		</div>
	);
};

export default Layout;
