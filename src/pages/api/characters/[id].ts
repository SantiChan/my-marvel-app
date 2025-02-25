import { NextApiRequest, NextApiResponse } from "next";
import { CharacterRepositoryImpl } from "@/infra/CharacterApiRepository";
import { CharacterService } from "@/application";

const characterService = new CharacterService(new CharacterRepositoryImpl());

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { id } = req.query;
	if (req.method === "GET") {
		try {
			const character = await characterService.getCharacterById(
				id as string,
			);
			if (!character)
				return res.status(404).json({ error: "Character not found" });
			return res.status(200).json(character);
		} catch (error) {
			return res
				.status(500)
				.json({ error: "Error fetching character detail" });
		}
	}
	return res.status(405).json({ error: "Method not allowed" });
}
