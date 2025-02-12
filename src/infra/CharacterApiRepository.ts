import { Character, CharacterRepository } from "@/domain";
import { CharacterDTO } from "@/infra/dtos/CharacterDTO";
import { mapApiCharacterToDomain } from "@/infra/mappers/CharacterMapper";

const BASE_URL = "https://dragonball-api.com/api/characters";

export class CharacterRepositoryImpl implements CharacterRepository {
	async getAll(): Promise<Character[]> {
		const resp = await fetch(`${BASE_URL}?limit=50`);

		if (!resp.ok) throw new Error("Error fetching characters");
		const data = await resp.json();
		if (Array.isArray(data.items)) {
			return data.items.map((item: Character) =>
				mapApiCharacterToDomain(item),
			);
		} else {
			throw new Error("Data items is not an array");
		}
	}

	async getById(id: string): Promise<Character | null> {
		const resp = await fetch(`${BASE_URL}/${id}`);
		if (!resp.ok) return null;
		const data: CharacterDTO = await resp.json();

		return mapApiCharacterToDomain(data);
	}
}
