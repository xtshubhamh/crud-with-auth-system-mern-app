import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const API = "http://localhost:5001/api/items";

  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      await axios.delete(`${API}/${id}`);
      fetchItems(); // Refresh list
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Items</h2>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
        Add New
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/edit/${item._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
