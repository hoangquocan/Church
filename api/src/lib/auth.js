import { AuthenticationError } from '@redwoodjs/graphql-server'
import admin from 'firebase-admin'
import { db } from './db'
import { ForbiddenError } from '@redwoodjs/graphql-server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminApp = admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
})

/**
 * getCurrentUser returns the user information from the decoded JWT
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`. Note could be null.
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * !! BEWARE !! Anything returned from this function will be available to the
 * client--it becomes the content of `currentUser` on the web side (as well as
 * `context.currentUser` on the api side). You should carefully add additional
 * fields to the return object only once you've decided they are safe to be seen
 * if someone were to open the Web Inspector in their browser.
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const getCurrentUser = async (
  user,
  decoded
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  // { token, type },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  // { event, context }
) => {
  const email = user.email
  const userRoles = await db.userRole.findMany({
    where: { user: { email } },
    select: { name: true },
  })
  const roles = userRoles.map((role) => {
    return role.name
  })
  return context.currentUser || { roles }
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = () => {
  return !!context.currentUser
}

/**
 * Call requireAuth in your services, or use the @requireAuth directive to check that a user is logged in,
 * and raise an error if they're not.
 *
 * @returns - If the currentUser is authenticated
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */

 export const hasRole = (roles) => {
  if (!isAuthenticated()) {
    return false
  }

  if (roles) {
    if (Array.isArray(roles)) {
      return context.currentUser.roles?.some((r) => roles.includes(r))
    }

    if (typeof roles === 'string') {
      return context.currentUser.roles?.includes(roles)
    }

    // roles not found
    return false
  }

  return true
}

export const requireAuth = ({ roles }) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError('Please Log In!')
  }
  if (roles && !hasRole(roles)) {
    throw new ForbiddenError(` Only ${roles} can use this feature`)

  }
  // Custom RBAC implementation required for firebase
  // https://firebase.google.com/docs/auth/admin/custom-claims
}
