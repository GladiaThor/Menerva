import { types } from 'mobx-state-tree'
import { ActionOption } from '../../action/ActionOption'
import { NavigationOption } from '../../navigation/NavigationOption'

export const Scene = types
  .model('Scene', {
    id: types.identifier,
    name: types.string,
    image: types.maybe(types.string),
    description: types.string,
    actions: types.maybe(types.array(types.frozen<ActionOption>())),
    navOptions: types.maybe(types.array(types.frozen<NavigationOption>()))
  })
  .actions((self) => ({
    changeImage(image: string) {
      self.image = image
    },
    addNavOption(navOption: any) {
      self.navOptions?.push(navOption)
    },
    addNavOptions(navOptions: any) {
      self.navOptions?.push(...navOptions)
    },
    addAction(action: any) {
      self.actions?.push(action)
    },
    addActions(actions: any) {
      self.actions?.push(...actions)
    }
  }))
  .views(() => ({}))
