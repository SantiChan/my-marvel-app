export interface CharacterDTO {
	id: number;
	name: string;
	ki: string;
	maxKi: string;
	race: string;
	gender: string;
	description: string;
	image: string;
	affiliation: string;
	deletedAt: string | null;
	originPlanet?: {
		name: string;
		image: string;
		description: string;
	};
}
