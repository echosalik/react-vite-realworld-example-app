import classNames from 'classnames'
import React from 'react'
import { ArticleList, PopularTags } from '../components'
import { useAuth } from '../hooks'

const initialFilters = { tag: [], offset: null, feed: false }
const selectedTags = [];

function Home() {
  const { isAuth } = useAuth()
  const [filters, setFilters] = React.useState({ ...initialFilters, feed: isAuth })

  React.useEffect(() => {
    setFilters({ ...initialFilters, feed: isAuth });
  }, [isAuth])

  function onTagClick(tag, state) {
    if(state){
      selectedTags.push(tag.tag);
    } else {
      const id = selectedTags.indexOf(tag.tag);
      if(id !== -1) delete selectedTags[id];
    }
    const ftag = selectedTags.filter(x => x !== "");
    setFilters({ ...initialFilters, tag: ftag })
  }

  function onGlobalFeedClick() {
    setFilters(initialFilters)
  }

  function onFeedClick() {
    setFilters({ ...initialFilters, feed: true })
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isAuth && (
                  <li className="nav-item">
                    <button
                      onClick={onFeedClick}
                      type="button"
                      className={classNames('nav-link', {
                        active: filters.feed,
                      })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', {
                      active: !filters?.tag && !filters.feed,
                    })}
                    onClick={onGlobalFeedClick}
                  >
                    Global Feed
                  </button>
                </li>
                {filters?.tag && (
                  filters.tag.map((f) => <li className="nav-item">
                      <a className="nav-link active"># {f}</a>
                    </li>)
                )}
              </ul>
            </div>
            <ArticleList filters={filters} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={onTagClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
