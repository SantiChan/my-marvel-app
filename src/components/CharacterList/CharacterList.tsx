import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./CharacterList.module.scss";
import CharacterCard from "../CharacterCard/CharacterCard";
import { Character } from "@/domain";
import SearchBar from "../SearchBar/SearchBar";
import { useFavorites } from "@/context/FavoritesContext";

const CharacterList: React.FC = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [searchText, setSearchText] = useState<string>("");

	const { favorites, showFavorites } = useFavorites();

	useEffect(() => {
		async function fetchCharacters() {
			try {
				const response = await fetch("/api/characters");
				if (!response.ok) {
					throw new Error("Failed to fetch characters");
				}
				const data = await response.json();
				setCharacters(data);
			} catch (error) {
				console.error("Error fetching characters:", error);
			}
		}
		fetchCharacters();
	}, []);

	const filteredCharacters = useMemo(() => {
		let filtered = characters;
		if (searchText) {
			filtered = filtered.filter((character) =>
				character.name.toLowerCase().includes(searchText.toLowerCase()),
			);
		}
		if (showFavorites) {
			filtered = filtered.filter((character) =>
				favorites.includes(character.id.toString()),
			);
		}

		return filtered;
	}, [characters, searchText, showFavorites, favorites]);

	const handleSearchChange = useCallback((value: string) => {
		setSearchText(value);
	}, []);

	return (
		<div>
			{showFavorites && <h2 className={styles.favTitle}>Favorites</h2>}
			<SearchBar onSearchChange={handleSearchChange} />
			<p className={styles.contResults}>
				{filteredCharacters.length} Results
			</p>
			<div className={styles.charactersGrid}>
				{filteredCharacters.map((item) => (
					<CharacterCard
						key={item.id}
						imageUrl={item.image}
						name={item.name}
						id={item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default CharacterList;
