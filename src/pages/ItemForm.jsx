import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, createItem, updateItem } from "../services/itemService.js";

const EMPTY = {
  name: "",
  brandName: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
};

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const item = await getItemById(id);
        setForm({
          name: item.name || "",
          brandName: item.brandName || "",
          category: item.category || "",
          price: item.price ?? "",
          description: item.description || "",
          imageUrl: item.imageUrl || "",
        });
      } catch {
        alert("Failed to load item");
      }
    })();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (isEdit) {
        await updateItem(id, payload);
      } else {
        await createItem(payload);
      }
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isEdit ? "Edit Item" : "Add Item"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem", maxWidth: 420 }}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Brand Name
          <input name="brandName" value={form.brandName} onChange={handleChange} required />
        </label>
        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>
        <label>
          Price
          <input type="number" name="price" value={form.price} onChange={handleChange} min="0" required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Image URL
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
