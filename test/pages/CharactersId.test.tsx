import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CharacterDetail from "@/pages/characters/[id]";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("@/context/FavoritesContext", () => ({
	useFavorites: jest.fn(),
}));

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => <img {...props} />,
}));

describe("CharacterDetail Page", () => {
	const mockToggleFavorite = jest.fn();
	const mockFavoritesContext = {
		favorites: [],
		toggleFavorite: mockToggleFavorite,
	};

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			query: { id: "1" },
		});
		(useFavorites as jest.Mock).mockReturnValue(mockFavoritesContext);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("muestra 'Loading...' inicialmente", () => {
		global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
		render(<CharacterDetail />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renderiza los detalles del personaje tras obtener los datos", async () => {
		const characterData = {
			id: 1,
			name: "Goku",
			image: "/goku.jpg",
			description: "A Saiyan warrior",
			originPlanet: { name: "Planet Vegeta" },
		};

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(characterData),
			}),
		) as jest.Mock;

		render(<CharacterDetail />);

		await waitFor(() => {
			expect(screen.getByText("Goku")).toBeInTheDocument();
		});

		expect(screen.getByText("A Saiyan warrior")).toBeInTheDocument();
		expect(screen.getByAltText("Goku")).toBeInTheDocument();
		expect(screen.getByAltText("heart")).toBeInTheDocument();
	});

	it("llama a toggleFavorite al hacer click en el contenedor del nombre", async () => {
		const characterData = {
			id: 1,
			name: "Goku",
			image: "/goku.jpg",
			description: "A Saiyan warrior",
			originPlanet: { name: "Planet Vegeta" },
		};

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(characterData),
			}),
		) as jest.Mock;

		render(<CharacterDetail />);

		await waitFor(() => {
			expect(screen.getByText("Goku")).toBeInTheDocument();
		});

		const nameContainer = screen.getByText("Goku").parentElement;
		if (nameContainer) {
			fireEvent.click(nameContainer);
		}

		expect(mockToggleFavorite).toHaveBeenCalledWith("1");
	});
});
