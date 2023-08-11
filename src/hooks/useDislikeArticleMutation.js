import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'

function useDislikeArticleMutation(slug) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuth } = useAuth()
  const queryKey = `/articles/${slug}`

  return useMutation(
    (/** @type {{disliked: boolean}} */ { disliked }) => {
      if(disliked){
        return axios.delete(`/articles/${slug}/dislike`);
      } 
      return axios.post(`/articles/${slug}/dislike`);
    },
    {
      onSuccess: async () => {
        const previousArticle = queryClient.getQueryData(queryKey)

        if (isAuth) {
          await queryClient.cancelQueries(queryKey)

          queryClient.setQueryData(queryKey, ({ article: currentArticle }) => {
            const count = currentArticle.dislikesCount
            
            return {
              article: {
                ...currentArticle,
                disliked: !currentArticle.disliked,
                dislikesCount: currentArticle.disliked ? count - 1 : count + 1,
                favorited: (!currentArticle.disliked) ? false : currentArticle.favorited,
                favoritesCount: (!currentArticle.disliked) ? ((count - 1) < 0 ? 0 : count - 1) : currentArticle.favoritesCount,
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

export default useDislikeArticleMutation
