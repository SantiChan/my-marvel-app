import { CharacterRepository } from "../domain";

export class CharacterService {
	constructor(private characterRepo: CharacterRepository) {}
	async getCharacters() {
		return this.characterRepo.getAll();
	}
	async getCharacterById(id: string) {
		return this.characterRepo.getById(id);
	}
}
