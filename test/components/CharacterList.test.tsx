import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CharacterList from "@/components/CharacterList/CharacterList";
import { useFavorites } from "@/context/FavoritesContext";

jest.mock("@/context/FavoritesContext", () => ({
	useFavorites: jest.fn(),
}));

describe("CharacterList", () => {
	const mockUseFavorites = {
		favorites: ["1"],
		showFavorites: false,
		toggleFavorite: jest.fn(),
		setShowFavorites: jest.fn(),
	};

	beforeEach(() => {
		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve([
						{ id: 1, name: "Goku", image: "/goku.jpg" },
						{ id: 2, name: "Vegeta", image: "/vegeta.jpg" },
						{ id: 3, name: "Piccolo", image: "/piccolo.jpg" },
					]),
			}),
		) as jest.Mock;
	});

	it("renders characters and performs search", async () => {
		render(<CharacterList />);

		await waitFor(() => {
			expect(screen.getByText("Goku")).toBeInTheDocument();
			expect(screen.getByText("Vegeta")).toBeInTheDocument();
			expect(screen.getByText("Piccolo")).toBeInTheDocument();
		});

		const searchInput = screen.getByPlaceholderText(/search/i);
		fireEvent.change(searchInput, { target: { value: "Goku" } });

		expect(screen.getByText("Goku")).toBeInTheDocument();
		expect(screen.queryByText("Vegeta")).not.toBeInTheDocument();
		expect(screen.queryByText("Piccolo")).not.toBeInTheDocument();
	});

	it("filters to show only favorites", async () => {
		mockUseFavorites.showFavorites = true;

		render(<CharacterList />);

		await waitFor(() => {
			expect(screen.getByText("Goku")).toBeInTheDocument();
		});

		expect(screen.queryByText("Vegeta")).not.toBeInTheDocument();
		expect(screen.queryByText("Piccolo")).not.toBeInTheDocument();
	});

	it("toggles favorite when clicking the heart", async () => {
		render(<CharacterList />);

		await waitFor(() => {
			expect(screen.getByText("Goku")).toBeInTheDocument();
		});
		const heartButton = screen.getByAltText("heart");
		fireEvent.click(heartButton);

		expect(mockUseFavorites.toggleFavorite).toHaveBeenCalledWith("1");
	});
});
