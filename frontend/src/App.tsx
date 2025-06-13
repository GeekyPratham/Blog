import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';


const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
