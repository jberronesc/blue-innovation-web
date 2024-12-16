import { GroupMenuModuleSelectedEntity } from "./interfaces/GroupMenuModuleSelectedEntity"

export const groupGetMenusOnlySelected = (
  menus: GroupMenuModuleSelectedEntity[]
): {
  module: number
  permissions: number[]
}[] => {
  const menusSelected = menus
    .filter((menu) =>
      menu.modulesWrapper.some((moduleWrapper) => moduleWrapper.isSelected)
    )
    .map((menu) => ({
      ...menu,
      modulesWrapper: menu.modulesWrapper
        .filter((moduleWrapper) => moduleWrapper.isSelected)
        .map((moduleWrapper) => ({
          ...moduleWrapper,
          module: {
            ...moduleWrapper.module,
            permissions: moduleWrapper.module.permissions.filter(
              (permission) => permission.isSelected
            ),
          },
        })),
    }))

  const menusSelectedWrapper = menusSelected.map((menuSelected) => {
    return menuSelected.modulesWrapper.map((moduleWrapper) => ({
      module: moduleWrapper.module.id,
      permissions: moduleWrapper.module.permissions.map(
        (permission) => permission.id
      ),
    }))
  })

  return menusSelectedWrapper.reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  )
}
