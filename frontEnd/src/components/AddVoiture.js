import React, { useState } from 'react';
import { addVoiture } from '../services/VoitureService';

const AddVoiture = () => {
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [matricule, setMatricule] = useState('');
  const [idClient, setIdClient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVoiture(idClient, { marque, model, matricule });
      // Optionally, refresh the voiture list or show a success message
    } catch (error) {
      console.error('Error adding voiture:', error);
    }
    setMarque('');
    setModel('');
    setMatricule('');
    setIdClient('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Marque"
        value={marque}
        onChange={(e) => setMarque(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Modèle"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Matricule"
        value={matricule}
        onChange={(e) => setMatricule(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ID Client"
        value={idClient}
        onChange={(e) => setIdClient(e.target.value)}
        required
      />
      <button type="submit">Ajouter Voiture</button>
    </form>
  );
};

export default AddVoiture;
