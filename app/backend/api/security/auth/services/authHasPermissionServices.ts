import authGroupRolSessionOrAvailableServices from "./authGroupRolSessionOrAvailableServices"
import authRolServices from "./authRolServices"

const authHasPermissionServices = async ({
  permissions,
}: {
  permissions: string[]
}) => {
  const groupId = await authGroupRolSessionOrAvailableServices({})

  if (!groupId) return false

  const rolData = await authRolServices({})

  return permissions.every((permission) =>
    rolData.permissions.hasOwnProperty(permission)
  )
}

export default authHasPermissionServices
