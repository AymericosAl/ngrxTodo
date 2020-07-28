export const interfaces = {
  IMet: {
    __resolveType(IMet, context, info) {
      if (IMet.PASSAGE.toLowerCase() === 'stance') {
        return 'Stance'
      }
      if (IMet.PASSAGE.toLowerCase() === 'artpo') {
        return 'ArtPO'
      }

      return null
    },
  },
}
