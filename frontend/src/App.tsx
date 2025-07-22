
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import { Mypost } from './pages/Mypost';
import { Editprofile } from './pages/Editprofile';

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/blog/*" element={<Blog />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish/>}/>
        <Route path="/mypost" element={<Mypost />} />
        <Route path="/editprofile" element={<Editprofile/>} />
     
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
