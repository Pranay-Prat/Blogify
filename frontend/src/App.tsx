import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { Toaster } from 'react-hot-toast' 
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/blogs' element={<Blogs/> }/>
          <Route path="/blog/:id" element={<Blog />} />
          
          <Route path ='/publish' element={<Publish/>}/>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
