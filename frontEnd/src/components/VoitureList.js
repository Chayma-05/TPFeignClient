import React, { useEffect, useState } from 'react';
import { getAllVoitures } from '../services/VoitureService';
import UpdateVoiture from './UpdateVoiture';

const VoitureList = () => {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVoitureId, setSelectedVoitureId] = useState(null);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const data = await getAllVoitures();
        setVoitures(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVoitures();
  }, []);

  const handleUpdate = () => {
    setSelectedVoitureId(null);
    // Optionally refresh the list
  };

  if (loading) return <div>Loading voitures...</div>;
  if (error) return <div>Error loading voitures: {error.message}</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Modele</th>
            <th>Matricule</th>
            <th>ID Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {voitures.map(voiture => (
            <tr key={voiture.id}>
              <td>{voiture.id}</td>
              <td>{voiture.marque}</td>
              <td>{voiture.model}</td>
              <td>{voiture.matricule}</td>
              <td>{voiture.idclient}</td>
              <td>
                <button onClick={() => setSelectedVoitureId(voiture.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedVoitureId && (
        <UpdateVoiture voitureId={selectedVoitureId} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default VoitureList;
