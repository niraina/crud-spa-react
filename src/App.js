import Menu from './components/Menu';
import List from './pages/List';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<List />}></Route>
      </Routes>
    </>
  );
}

export default App;
