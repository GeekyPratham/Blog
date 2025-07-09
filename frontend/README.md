# 🚀 Blog Frontend

This is the **frontend** for the Blog platform, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides a modern, responsive UI for user authentication, blog publishing, and browsing, and is designed to work seamlessly with the [Blog Backend](../backend/README.md).

---

## ✨ Features

- 🔐 User Signup & Signin (JWT-based)
- 📝 Create, Edit, Delete, and View Blog Posts
- 🖼 Image upload (Cloudinary integration)
- 👤 My Posts section (view your own blogs)
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite
- 🧩 Modular, component-based architecture

---

## 📁 Project Structure

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and SVGs
│   ├── components/          # Reusable UI components (AppBar, BlogCard, etc.)
│   ├── hooks/               # Custom React hooks (useBlogs, etc.)
│   ├── pages/               # Page components (Blogs, Blog, Publish, etc.)
│   ├── App.tsx              # Main app with routes
│   ├── main.tsx             # React entry point
│   ├── index.css            # Tailwind CSS import
│   └── vite-env.d.ts
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


---


## 🛠️ Setup & Development

1. Install dependencies

This means you should run the following command in your terminal (inside the frontend folder):

  npm install

2. Start the development server

  npm run dev

  The app will be available at http://localhost:5173 (or as shown in your terminal).

3. Build for production

  npm run build

4. Preview production build
  npm run preview


---
## 🧩 Main Pages & Components

Signin/Signup: User authentication forms (/signin, /signup)
Blogs: List all blogs (/blogs)
Blog: View a single blog post (/blog/:id)
Publish: Create or edit a blog post (/publish)
Mypost: View your own posts (/mypost)
AppBar: Top navigation bar with user menu
BlogCard: Blog preview card
FullSingleBlog: Detailed blog view with images and author info

---

## 🔗 Routing

Routing is handled with react-router-dom:

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blog/*" element={<Blog />} />
    <Route path="/publish" element={<Publish />} />
    <Route path="/mypost" element={<Mypost />} />
  </Routes>
</BrowserRouter>

---
## 🖼 Image Upload

Images are uploaded to Cloudinary via the Publish page.
Uploaded image URLs are stored in the backend and displayed in blog posts.

--- 

## 🧪 Development Notes

State Management: Uses React hooks (useState, useEffect) and custom hooks (useBlogs, useBlog).
Styling: Tailwind CSS for rapid, utility-first styling.
API Calls: Uses axios for HTTP requests.
Validation: Uses zod schemas from the shared @geekypratham/blog-common package.
Authentication: JWT token is stored in localStorage and sent with API requests.

---

## 🛠️ Tech Stack

Framework: React 18 + Vite
Language: TypeScript
Styling: Tailwind CSS
Routing: react-router-dom
HTTP: axios
Validation: zod (from shared package)
Icons: lucide-react

---

## 🚀 Deployment

The frontend can be deployed to any static hosting Vercel.
For Vercel, see vercel.json for SPA routing support.

---

## 📚 References

React Documentation
Vite Documentation
Tailwind CSS
Cloudinary
React Router
Axios

---
## 🙏 Credits

UI/UX inspired by modern blog platforms.
Built by Pratham Raj.