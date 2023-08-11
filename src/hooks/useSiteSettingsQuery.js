import { useQuery } from 'react-query'

function useSiteSettingsQuery() {
  return useQuery([`/site-settings`], {
    placeholderData: {
      settings: [],
    },
    keepPreviousData: true,
  })
}

export default useSiteSettingsQuery
