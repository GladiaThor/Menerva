import {types} from "mobx-state-tree";
import {Trait} from "./Trait";

export const Character =  types.model("Character", {
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    description: types.string,
    isKnown: types.boolean,
    isPlayable: types.boolean,
    skills: types.map(types.number),
    stats: types.map(types.number),
    traits: types.map(types.frozen<Trait>()),
    portrait: types.string,
    picture: types.string
}).actions(self => ({
    hasStatScore(statName: string, level: number) {
        return (self.stats.get(statName) || 0) >= level;
    },
    hasStat(statName: string) {
        return self.stats.get(statName) !== undefined;
    },
    increaseStat(statName: string, amount: number) {
        const currentStatValue: number = self.stats.get(statName) || 0;
        self.stats.set(statName, currentStatValue + amount);
    },
    reduceStat(statName: string, amount: number) {
        const currentStatValue = self.stats.get(statName);
        if (currentStatValue === undefined) return;
        const newStatValue = currentStatValue - amount < 0 ? 0 : currentStatValue - amount;
        self.stats.set(statName, newStatValue);
    },

    hasSkillLevel(skillName: string, level: number) {
        return (self.skills.get(skillName) || 0) >= level;
    },
    hasSkill(skillName: string) {
        return self.skills.get(skillName) !== undefined;
    },
    increaseSkillLevel(skillName: string, amount: number) {
        const currentSkillValue: number = self.skills.get(skillName) || 0;
        self.skills.set(skillName, currentSkillValue + amount);
    },
    reduceSkillLevel(skillName: string, amount: number) {
        const currentSkillValue = self.skills.get(skillName);
        if (currentSkillValue === undefined) return;
        const newSkillValue = currentSkillValue - amount < 0 ? 0 : currentSkillValue - amount;
        self.skills.set(skillName, newSkillValue);
    },

    addTrait(trait: Trait) {
        self.traits.set(trait.id, trait);
    },
    removeTrait(traitId: string) {
        self.traits.delete(traitId);
    },
    hasTrait(traitId: string) {
        return self.traits.get(traitId) !== undefined;
    }


})).views(self => ({
    get fullName() {
        return `${self.firstName} ${self.lastName}`;
    }
}));
