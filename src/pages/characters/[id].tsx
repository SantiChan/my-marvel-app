import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./CharacterDetail.module.scss";
import Image from "next/image";
import { Character } from "@/domain";
import PlanetInfo from "@/components/PlanetInfo/PlanetInfo";
import { useDetailCharacter } from "@/hooks/useDetailCharacter";

const CharacterDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { character, isLoading, error } = useDetailCharacter(id);
	const { favorites, toggleFavorite } = useFavorites();

	const handleToggleFavorite = useCallback(() => {
		if (character) {
			toggleFavorite(character.id.toString());
		}
	}, [character, toggleFavorite]);

	if (isLoading || !character) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error loading characters.</div>;
	}

	const isFavorite = favorites.includes(character.id.toString());

	return (
		<div>
			<div className={styles.cardInfo}>
				<div className={styles.characterImage}>
					<Image
						src={character.image}
						alt={character.name}
						width={250}
						height={400}
					/>
				</div>
				<div className={styles.detailContainer}>
					<div
						className={styles.nameContainer}
						onClick={handleToggleFavorite}
					>
						<span className={styles.name}>{character.name}</span>
						<Image
							src={
								isFavorite
									? "/images/Heart_icon_full.svg"
									: "/images/Heart_icon_empty.svg"
							}
							alt="heart"
							width={35}
							height={35}
						/>
					</div>
					<div>
						<p className={styles.description}>
							{character.description}
						</p>
					</div>
				</div>
			</div>
			<p className={styles.detailTitle}>PLANETA DE ORIGEN</p>
			<div className={styles.comicsSection}>
				{character.originPlanet && (
					<PlanetInfo planet={character.originPlanet} />
				)}
			</div>
		</div>
	);
};

export default CharacterDetail;
