import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from './Login.jsx'
import Register from './Register';
import Home from './Home';
import Header from './Header';
import NoteEditor from "./NoteEditor.jsx";
import NoteList from "./NoteList.jsx";
import Note from "./Note.jsx";
import TagList from "./TagList.jsx";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div className="mx-auto max-w-6xl py-24 px-6">
          <Routes>
            <Route path="/" >
              <Route index element={<Home />} />
              <Route path="edit" element={<NoteEditor />} />
              <Route path="*" element={<><h1>404 Not Found</h1></>} />
            </Route>

            <Route path="account">
              <Route index element={<Navigate to="/account/login" replace={true} />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="notes" element={<NoteList />} />
            <Route path="/notes/:noteId" element={<Note />} />

            <Route path="tags" element={<TagList />} />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
