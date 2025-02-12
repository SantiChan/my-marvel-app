import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";

export const Header: React.FC = () => {
	const { favorites, showFavorites, setShowFavorites } = useFavorites();

	const handleFavoritesClick = () => {
		setShowFavorites(!showFavorites);
	};

	return (
		<header className={styles.headerContainer}>
			<div className={styles.logo}>
				<Link href="/">
					<Image
						src="/images/Marvel_logo.svg"
						alt="Logo"
						width={140}
						height={80}
					/>
				</Link>
			</div>
			<div
				className={styles.heartContainer}
				onClick={handleFavoritesClick}
			>
				<Image
					src="/images/Heart_icon_full.svg"
					alt="heart"
					width={25}
					height={25}
				/>
				<div className={styles.countContainer}>
					<span>{favorites.length}</span>
				</div>
			</div>
		</header>
	);
};
