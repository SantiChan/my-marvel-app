import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useDetailCharacter } from "@/hooks/useDetailCharacter";
import "@testing-library/jest-dom";

describe("useDetailCharacter", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return loading initially and then character data", async () => {
		const characterData = {
			id: 1,
			name: "Goku",
			image: "/goku.jpg",
			description: "A powerful warrior",
			originPlanet: {
				name: "Planet Vegeta",
				image: "/vegeta.jpg",
				description: "Home of the Saiyans",
			},
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => characterData,
		});

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<SWRConfig value={{ revalidateOnMount: true, dedupingInterval: 0 }}>
				{children}
			</SWRConfig>
		);

		const { result } = renderHook(() => useDetailCharacter("1"), {
			wrapper,
		});

		await waitFor(
			() => {
				expect(result.current.isLoading).toBe(false);
			},
			{ timeout: 3000 },
		);

		expect(result.current.character).toEqual(characterData);
	});

	it("should handle error when fetch fails", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Failed to fetch character"),
		);

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<SWRConfig value={{ revalidateOnMount: true, dedupingInterval: 0 }}>
				{children}
			</SWRConfig>
		);

		const { result } = renderHook(() => useDetailCharacter("1"), {
			wrapper,
		});

		await waitFor(
			() => {
				expect(result.current.error).toBeDefined();
			},
			{ timeout: 3000 },
		);
	});
});
