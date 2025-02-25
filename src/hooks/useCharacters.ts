import useSWR from "swr";
import { Character } from "@/domain";

const fetcher = async (url: string): Promise<Character[]> => {
	const res = await fetch(url);
	if (!res.ok) {
		const error = new Error("An error occurred while fetching the data.");
		(error as any).status = res.status;
		(error as any).info = await res.json();
		throw error;
	}
	return res.json();
};

export const useCharacters = () => {
	const { data, error } = useSWR<Character[]>("/api/characters", fetcher, {});

	return {
		characters: data,
		isLoading: !error && !data,
		isError: error,
	};
};
