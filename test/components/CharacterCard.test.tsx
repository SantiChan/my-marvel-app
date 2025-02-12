import React from "react";
import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/context/FavoritesContext";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

jest.mock("@/context/FavoritesContext", () => ({
	useFavorites: jest.fn(),
}));

describe("CharacterCard", () => {
	it("renders character name and image correctly", () => {
		const mockUseFavorites = {
			favorites: ["1"],
			toggleFavorite: jest.fn(),
		};
		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);

		render(<CharacterCard imageUrl="/image.jpg" name="Goku" id={1} />);

		expect(screen.getByText("Goku")).toBeInTheDocument();
		expect(screen.getByAltText("Goku")).toHaveAttribute(
			"src",
			"/image.jpg",
		);
	});

	it("shows the heart as filled when character is a favorite", () => {
		const mockUseFavorites = {
			favorites: ["1"],
			toggleFavorite: jest.fn(),
		};
		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);

		render(<CharacterCard imageUrl="/image.jpg" name="Goku" id={1} />);

		expect(screen.getByAltText("heart")).toHaveAttribute(
			"src",
			"/images/Heart_icon_full.svg",
		);
	});

	it("shows the heart as empty when character is not a favorite", () => {
		const mockUseFavorites = {
			favorites: [],
			toggleFavorite: jest.fn(),
		};
		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);

		render(<CharacterCard imageUrl="/image.jpg" name="Goku" id={1} />);

		expect(screen.getByAltText("heart")).toHaveAttribute(
			"src",
			"/images/Heart_icon_empty.svg",
		);
	});

	it("calls toggleFavorite when heart is clicked", () => {
		const mockUseFavorites = {
			favorites: [],
			toggleFavorite: jest.fn(),
		};
		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);

		render(<CharacterCard imageUrl="/image.jpg" name="Goku" id={1} />);
		screen.getByAltText("heart").click();

		expect(mockUseFavorites.toggleFavorite).toHaveBeenCalledWith("1");
	});
});
