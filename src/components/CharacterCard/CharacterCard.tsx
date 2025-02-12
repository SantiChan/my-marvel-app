import React, { useCallback } from "react";
import styles from "./CharacterCard.module.scss";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";

type CharacterCardProps = {
	imageUrl?: string;
	name?: string;
	id: number;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
	imageUrl,
	name,
	id,
}) => {
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = favorites.includes(id.toString());

	const handleFavoriteClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			toggleFavorite(id.toString());
		},
		[id, toggleFavorite],
	);

	return (
		<div className={styles.card}>
			<Link href={`/characters/${id}`} passHref>
				<div className={styles.cardImageContainer}>
					<img
						className={styles.cardImage}
						src={imageUrl}
						alt={name}
					/>
				</div>
			</Link>
			<div className={styles.redBar}></div>
			<div className={styles.cardInfo}>
				<Link href={`/characters/${id}`} passHref>
					<span className={styles.name}>{name}</span>
				</Link>
				<div className={styles.heartIcon} onClick={handleFavoriteClick}>
					<Image
						src={
							isFavorite
								? "/images/Heart_icon_full.svg"
								: "/images/Heart_icon_empty.svg"
						}
						alt="heart"
						width={15}
						height={15}
					/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(CharacterCard);
