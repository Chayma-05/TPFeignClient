import React, { useEffect, useState } from 'react';
import { getClients } from '../services/ClientService';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        console.log('Fetched clients:', data);
        setClients(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>Error loading clients: {error.message}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.nom}</td>
            <td>{client.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList;