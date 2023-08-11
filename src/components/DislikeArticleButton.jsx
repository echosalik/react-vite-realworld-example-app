import classNames from 'classnames'
import React from 'react'
import { useDislikeArticleMutation } from '../hooks'

function DislikeArticleButton({ slug, disliked, children, className = '' }) {
  const { mutate, isLoading } = useDislikeArticleMutation(slug)
  return (
    <button
      type="button"
      className={classNames(
        'btn btn-sm',
        {
          'btn-outline-primary': !disliked,
          'btn-primary': disliked,
        },
        className
      )}
      onClick={() => mutate({ disliked })}
      disabled={isLoading}
    >
      <i className="ion-thumbsdown" />
      {children}
    </button>
  )
}

export default DislikeArticleButton
