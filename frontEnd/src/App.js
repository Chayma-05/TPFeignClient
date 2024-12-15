import React from 'react';
import ClientList from './components/ClientList';
import VoitureList from './components/VoitureList'; // New component
import AddClient from './components/AddClient'; // New component
import AddVoiture from './components/AddVoiture'; // New component

const App = () => {
  return (
    <div>
      <h1>Clients</h1>
      <AddClient />
      <ClientList />
      <h1>Voitures</h1>
      <AddVoiture />
      <VoitureList />
    </div>
  );
};

export default App;