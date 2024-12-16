import prisma from "@/app/backend/shared/prisma/prisma"
import { SecurityMenu } from "@prisma/client"
import authGroupRolSessionOrAvailableServices from "./authGroupRolSessionOrAvailableServices"

const authRolServices = async ({}) => {
  const groupId = await authGroupRolSessionOrAvailableServices({})

  if (!groupId)
    return {
      menus: [],
      permissions: {},
    }

  const groupModulePermissions =
    await prisma.securityGroupModulePermission.findMany({
      where: {
        groupId,
        module: {
          isActive: true,
        },
      },
      include: {
        module: {
          include: {
            menu: true,
          },
        },
        permissions: true,
      },
      orderBy: {
        module: {
          name: "asc",
        },
      },
    })

  const menusUniques = groupModulePermissions.reduce(
    (accumulator: SecurityMenu[], current) =>
      accumulator.some((elem) => elem.id == current.module.menuId)
        ? accumulator
        : [...accumulator, current.module.menu],
    []
  )

  const menus = menusUniques.map((menu) => ({
    ...menu,
    modules: groupModulePermissions
      .filter((gMP) => gMP.module.menuId == menu.id)
      .map((gMP) => gMP.module),
  }))

  const permissions = groupModulePermissions.map((gMP) =>
    gMP.permissions.map((permission) => ({
      [permission.label]: permission.label,
    }))
  )
  const permissionsLine = permissions.reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  )

  const permissionsObject = permissionsLine.reduce(
    (accumulator, current) => ({ ...accumulator, ...current }),
    {}
  )

  return {
    menus,
    permissions: permissionsObject,
  }
}

export default authRolServices
