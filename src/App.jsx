// @ts-nocheck
import React from 'react'
import { isEmpty } from 'lodash-es'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, Settings, Editor, Article, Profile, Auth, SiteSettings } from './pages'
import { AuthRoute, GuestRoute, Navbar } from './components'
import { useSiteSettingsQuery } from './hooks'

import './theme.css'

function App() {
  const { data } = useSiteSettingsQuery();
  
  React.useEffect(() => {
    if(!isEmpty(data)){
      // eslint-disable-next-line no-restricted-syntax
      for(const d of data.settings){
        document.documentElement.style.setProperty(`--${d.name}`, d.value);
      }
    }
  }, [ data ]);
  
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <GuestRoute path="/register" element={<Auth key="register" />} />
          <GuestRoute path="/login" element={<Auth key="login" />} />
          <AuthRoute path="/site-settings" element={<SiteSettings />} />
          <AuthRoute path="/settings" element={<Settings />} />
          <AuthRoute path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          <AuthRoute path="/@:username" element={<Profile />} />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App
