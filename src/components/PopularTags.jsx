import React from 'react'
import { useQuery } from 'react-query'

function PopularTags({ onTagClick }) {
  const { data, isFetching, isError } = useQuery('/tags', { placeholderData: { tags: [] } })

  function content() {
    if (isFetching) return <p>Loading tags...</p>
    if (isError) return <p>Loading tags failed :(</p>

    return data.tags.map((tag) => (
      <span className="tag-pill tag-default">
        <input type='checkbox'
          name="tag" key={tag.id} 
          onChange={(e) => {
            onTagClick(tag, e.target.checked)
            // e.preventDefault()
          }}
        />
        {tag.tag}
      </span>
      // <a
      //   href="#"
      //   key={tag.id}
      //   className="tag-pill tag-default"
      //   onClick={(e) => {
      //     e.preventDefault()

      //     onTagClick(tag.tag)
      //   }}
      // >
      //   {tag.tag}
      // </a>
    ))
  }

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">{content()}</div>
    </div>
  )
}

export default PopularTags
