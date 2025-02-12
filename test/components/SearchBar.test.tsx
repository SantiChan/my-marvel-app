import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header/Header";
import { useFavorites } from "@/context/FavoritesContext";

jest.mock("@/context/FavoritesContext", () => ({
	useFavorites: jest.fn(),
}));

describe("Header", () => {
	const mockSetShowFavorites = jest.fn();
	const mockUseFavorites = {
		favorites: ["1", "2"],
		showFavorites: false,
		setShowFavorites: mockSetShowFavorites,
	};

	beforeEach(() => {
		(useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the header with logo, heart icon and favorites count", () => {
		render(<Header />);

		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByAltText("heart")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("calls setShowFavorites when clicking on the heart container", () => {
		render(<Header />);

		const heartIcon = screen.getByAltText("heart");
		fireEvent.click(heartIcon);

		expect(mockSetShowFavorites).toHaveBeenCalledWith(true);
	});
});
