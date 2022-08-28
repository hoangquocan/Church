import * as Filestack from 'filestack-js'

export const deleteImage = async({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const image = await db.image.findUnique({ where: { id } })

  // The `security.handle` is the unique part of the Filestack file's url.
  const handle = image.url.split('/').pop()

  const security = Filestack.getSecurity(
    {
      // We set `expiry` at `now() + 5 minutes`.
      expiry: new Date().getTime() + 5 * 60 * 1000,
      handle,
      call: ['remove'],
    },
    process.env.REDWOOD_ENV_FILESTACK_SECRET
  )

  await client.remove(handle, security)

  return db.image.delete({ where: { id } } )
}