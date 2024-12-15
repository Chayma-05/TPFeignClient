import React, { useState, useEffect } from 'react';
import { updateVoiture, getAllVoitures } from '../services/VoitureService';

const UpdateVoiture = ({ voitureId, onUpdate }) => {
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [matricule, setMatricule] = useState('');
  const [idClient, setIdClient] = useState('');

  useEffect(() => {
    const fetchVoiture = async () => {
      const voitures = await getAllVoitures();
      const voiture = voitures.find(v => v.id === voitureId);
      if (voiture) {
        setMarque(voiture.marque);
        setModel(voiture.model);
        setMatricule(voiture.matricule);
        setIdClient(voiture.idclient);
      }
    };

    fetchVoiture();
  }, [voitureId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVoiture(voitureId, { marque, model, matricule, idClient });
      onUpdate(); // Callback to refresh the list or show a success message
    } catch (error) {
      console.error('Error updating voiture:', error);
    }
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
      <button type="submit">Update Voiture</button>
    </form>
  );
};

export default UpdateVoiture;
