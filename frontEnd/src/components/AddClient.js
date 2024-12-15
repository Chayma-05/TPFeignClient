import React, { useState } from 'react';
import { addClient } from '../services/ClientService'; // Create this function in your service

const AddClient = () => {
  const [nom, setNom] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addClient({ nom, age });
    setNom('');
    setAge('');
    // Optionally, refresh the client list or show a success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button type="submit">Ajouter Client</button>
    </form>
  );
};

export default AddClient;
