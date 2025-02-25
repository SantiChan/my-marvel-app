import useSWR from "swr";
import { Character } from "@/domain";

const fetcher = async (url: string): Promise<Character> => {
	const res = await fetch(url);
	if (!res.ok) {
		const error = new Error("Error fetching character");
		(error as any).status = res.status;
		throw error;
	}
	return res.json();
};

export const useDetailCharacter = (id: string | string[] | undefined) => {
	const { data, error } = useSWR<Character>(
		id ? `/api/characters/${id}` : null,
		fetcher,
	);

	return {
		character: data,
		isLoading: !error && !data,
		error,
	};
};
