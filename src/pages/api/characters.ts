import { NextApiRequest, NextApiResponse } from "next";
import { CharacterRepositoryImpl } from "@/infra/CharacterApiRepository";

const repo = new CharacterRepositoryImpl();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const characters = await repo.getAll();
			return res.status(200).json(characters);
		} catch (error) {
			console.error("Error fetching characters:", error);
			return res.status(500).json({ error: "Error fetching characters" });
		}
	}
	return res.status(405).json({ error: "Method not allowed" });
}
