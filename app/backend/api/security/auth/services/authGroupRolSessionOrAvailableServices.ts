import prisma from "@/app/backend/shared/prisma/prisma"
import { auth, update } from "@/auth"

const authGroupRolSessionOrAvailableServices = async ({}): Promise<
  number | null
> => {
  const session = await auth()

  if (!session) return null

  if (session?.user) return null

  if (session.user.groupId === "" || session.user.groupId === null) {
    const user = await prisma.securityUser.findUnique({
      where: {
        email: session.user.email!!,
        isActive: true,
      },
      select: {
        groups: true,
      },
    })

    if (!user) return null

    if (user.groups.length === 0) return null

    const group = user.groups[0]

    await update({
      ...session,
      user: { ...session.user, groupId: group.id.toString() },
    })

    return group.id
  }

  return parseInt(session.user.groupId!!)
}

export default authGroupRolSessionOrAvailableServices
