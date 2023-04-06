import {types} from "mobx-state-tree";


export const Trait = types.model("TraitB", {
    name: types.string,
    description: types.string,
    id: types.string,
    isHidden: types.boolean
}).views(self => ({
    get isHidden() {
        return self.isHidden;
    },
    get name() {
        return self.name;
    },
    get description() {
        return self.description;
    },
    get id() {
        return self.id;
    }
}));
