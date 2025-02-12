import React, { createContext, useContext, useState, ReactNode } from "react";

type FavoritesContextType = {
	favorites: string[];
	showFavorites: boolean;
	toggleFavorite: (id: string) => void;
	setShowFavorites: (value: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [favorites, setFavorites] = useState<string[]>([]);
	const [showFavorites, setShowFavorites] = useState<boolean>(false);

	const toggleFavorite = (id: string) => {
		setFavorites((prevFavorites) => {
			if (prevFavorites.includes(id)) {
				return prevFavorites.filter((favoriteId) => favoriteId !== id);
			} else {
				return [...prevFavorites, id];
			}
		});
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				showFavorites,
				toggleFavorite,
				setShowFavorites,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};
