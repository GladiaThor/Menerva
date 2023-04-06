import {Trait} from "./Trait";

export interface CharacterDefinition {
    firstName: string,
    lastName?: string,
    id: string,
    description: string,
    stats: { [key: string]: number },
    skills: { [key: string]: number },
    traits: { [key: string]: Trait },
    isPlayable: boolean,
    isKnown: boolean,
    portrait?: string,
    picture?: string,
}
