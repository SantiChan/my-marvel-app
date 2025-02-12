import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "@/context/FavoritesContext";
import React from "react";

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<FavoritesProvider>{children}</FavoritesProvider>
);

describe("FavoritesContext", () => {
	it("debe iniciar con favorites vacío y showFavorites en false", () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.favorites).toEqual([]);
		expect(result.current.showFavorites).toBe(false);
	});

	it("toggleFavorite agrega y quita un favorito", () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.favorites).toEqual([]);

		act(() => {
			result.current.toggleFavorite("1");
		});
		expect(result.current.favorites).toEqual(["1"]);

		act(() => {
			result.current.toggleFavorite("1");
		});
		expect(result.current.favorites).toEqual([]);
	});

	it("setShowFavorites actualiza el estado de showFavorites", () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });

		expect(result.current.showFavorites).toBe(false);

		act(() => {
			result.current.setShowFavorites(true);
		});
		expect(result.current.showFavorites).toBe(true);
	});
});
