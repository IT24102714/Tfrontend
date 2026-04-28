import { Routes, Route, Link } from "react-router-dom";
import ItemList from "./pages/ItemList.jsx";
import ItemForm from "./pages/ItemForm.jsx";

export default function App() {
  return (
    <div>
      <nav style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "0.5rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/add">Add Item</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<ItemForm />} />
        <Route path="/edit/:id" element={<ItemForm />} />
      </Routes>
    </div>
  );
}
