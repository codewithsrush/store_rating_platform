import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/admin/stores").then((res) => {
      setStores(res.data.stores);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Stores</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.rating || 0}</td>
              <td>{s.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}