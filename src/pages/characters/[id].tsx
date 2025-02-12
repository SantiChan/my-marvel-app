import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./CharacterDetail.module.scss";
import Image from "next/image";
import { Character } from "@/domain";
import PlanetInfo from "@/components/PlanetInfo/PlanetInfo";

const CharacterDetail = () => {
	const [character, setCharacter] = useState<Character | null>(null);
	const router = useRouter();
	const { id } = router.query;
	const { favorites, toggleFavorite } = useFavorites();

	useEffect(() => {
		if (!router.isReady) return;

		if (id) {
			const fetchCharacter = async () => {
				try {
					const response = await fetch(`/api/characters/${id}`);
					if (!response.ok) {
						throw new Error("Failed to fetch character");
					}
					const data = await response.json();
					setCharacter(data);
				} catch (error) {
					console.error("Error fetching character:", error);
				}
			};

			fetchCharacter();
		}
	}, [id, router.isReady]);

	const handleToggleFavorite = useCallback(() => {
		if (character) {
			toggleFavorite(character.id.toString());
		}
	}, [character, toggleFavorite]);

	if (!character) return <div>Loading...</div>;

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
