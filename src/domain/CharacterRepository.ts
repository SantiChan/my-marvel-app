import { Character } from "./Character";

export interface CharacterRepository {
	getAll(): Promise<Character[]>;
	getById(id: string): Promise<Character | null>;
}
