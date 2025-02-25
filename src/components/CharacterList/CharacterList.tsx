import React, { useMemo, useCallback, useState } from "react";
import styles from "./CharacterList.module.scss";
import CharacterCard from "../CharacterCard/CharacterCard";
import SearchBar from "../SearchBar/SearchBar";
import { useFavorites } from "@/context/FavoritesContext";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/domain";

const CharacterList: React.FC = () => {
	const [searchText, setSearchText] = useState<string>("");
	const { favorites, showFavorites } = useFavorites();
	const { characters, isLoading, isError } = useCharacters();

	const filteredCharacters = useMemo(() => {
		if (!characters) return [];
		let filtered = characters;
		if (searchText) {
			filtered = filtered.filter((character: Character) =>
				character.name.toLowerCase().includes(searchText.toLowerCase()),
			);
		}
		if (showFavorites) {
			filtered = filtered.filter((character: Character) =>
				favorites.includes(character.id.toString()),
			);
		}
		return filtered;
	}, [characters, searchText, showFavorites, favorites]);

	const handleSearchChange = useCallback((value: string) => {
		setSearchText(value);
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading characters.</div>;

	return (
		<div>
			{showFavorites && <h2 className={styles.favTitle}>Favorites</h2>}
			<SearchBar onSearchChange={handleSearchChange} />
			<p className={styles.contResults}>
				{filteredCharacters.length} Results
			</p>
			<div className={styles.charactersGrid}>
				{filteredCharacters.map((item: Character) => (
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
