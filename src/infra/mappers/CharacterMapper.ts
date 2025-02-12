import { Character } from "@/domain/Character";
import { CharacterDTO } from "@/infra/dtos/CharacterDTO";

export function mapApiCharacterToDomain(apiCharacter: CharacterDTO): Character {
	return {
		id: apiCharacter.id,
		name: apiCharacter.name,
		ki: apiCharacter.ki,
		maxKi: apiCharacter.maxKi,
		race: apiCharacter.race,
		gender: apiCharacter.gender,
		description: apiCharacter.description,
		image: apiCharacter.image,
		affiliation: apiCharacter.affiliation,
		deletedAt: apiCharacter.deletedAt,
		originPlanet: apiCharacter.originPlanet
			? {
					name: apiCharacter.originPlanet.name,
					image: apiCharacter.originPlanet.image,
					description: apiCharacter.originPlanet.description,
				}
			: undefined,
	};
}

export function mapDomainCharacterToDTO(character: Character): CharacterDTO {
	return {
		id: character.id,
		name: character.name,
		ki: character.ki,
		maxKi: character.maxKi,
		race: character.race,
		gender: character.gender,
		description: character.description,
		image: character.image,
		affiliation: character.affiliation,
		deletedAt: character.deletedAt,
		originPlanet: character.originPlanet
			? {
					name: character.originPlanet.name,
					image: character.originPlanet.image,
					description: character.originPlanet.description,
				}
			: undefined,
	};
}
