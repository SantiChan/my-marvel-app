import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header/Header";
import { useFavorites } from "@/context/FavoritesContext";
import { jest } from "@jest/globals";

jest.mock("@/context/FavoritesContext", () => ({
	useFavorites: jest.fn(),
}));

describe("Header Component", () => {
	const mockSetShowFavorites = jest.fn();

	beforeEach(() => {
		(useFavorites as jest.Mock).mockReturnValue({
			favorites: [{ id: 1 }, { id: 2 }],
			showFavorites: false,
			setShowFavorites: mockSetShowFavorites,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the header with logo and favorites count", () => {
		render(<Header />);

		expect(screen.getByAltText("Logo")).toBeInTheDocument();

		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("calls setShowFavorites when the heart icon is clicked", () => {
		render(<Header />);

		fireEvent.click(screen.getByAltText("heart"));

		expect(mockSetShowFavorites).toHaveBeenCalledWith(true);
	});
});
