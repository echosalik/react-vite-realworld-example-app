import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'

function useFavoriteArticleMutation(slug) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuth } = useAuth()
  const queryKey = `/articles/${slug}`

  return useMutation(
    (/** @type {{favorited: boolean}} */ { favorited }) => {
      if(favorited){
        return axios.delete(`/articles/${slug}/favorite`);
      } 
      return axios.post(`/articles/${slug}/favorite`);
    },
    {
      onSuccess: async () => {
        const previousArticle = queryClient.getQueryData(queryKey)

        if (isAuth) {
          await queryClient.cancelQueries(queryKey)

          queryClient.setQueryData(queryKey, ({ article: currentArticle }) => {
            const count = currentArticle.favoritesCount

            return {
              article: {
                ...currentArticle,
                favorited: !currentArticle.favorited,
                favoritesCount: currentArticle.favorited ? count - 1 : count + 1,
                disliked: (!currentArticle.favorited) ? false : currentArticle.disliked,
                dislikesCount: (!currentArticle.favorited) ? ((count - 1) < 0 ? 0 : count - 1) : currentArticle.dislikesCount,
              },
            }
          })
        } else {
          navigate('/login')
        }

        return { previousArticle }
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context.previousArticle)
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey)
      },
    }
  )
}

export default useFavoriteArticleMutation
