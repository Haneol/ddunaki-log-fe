import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import MyInfo from "./pages/MyInfo";
import PostingAdd from "./pages/PostingAdd";
import PostingEdit from "./pages/PostingEdit";
import PostingDetail from "./pages/PostingDetail";
import Search from "./pages/Search";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/myInfo" element={<MyInfo />} />
      <Route path="/posting/add" element={<PostingAdd />} />
      <Route path="/posting/edit" element={<PostingEdit />} />
      <Route path="/posting/detail" element={<PostingDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;