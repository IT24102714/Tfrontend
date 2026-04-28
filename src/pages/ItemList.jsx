import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems, deleteItem } from "../services/itemService.js";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      loadItems();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (items.length === 0) return <p>No items yet. <Link to="/add">Add one</Link>.</p>;

  return (
    <div>
      <h1>Items</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it._id}>
              <td>
                {it.imageUrl
                  ? <img src={it.imageUrl} alt={it.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
                  : "—"}
              </td>
              <td>{it.name}</td>
              <td>{it.brandName}</td>
              <td>{it.category}</td>
              <td>{it.price}</td>
              <td>{it.description}</td>
              <td>
                <Link to={`/edit/${it._id}`}>Edit</Link>{" | "}
                <button onClick={() => handleDelete(it._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
