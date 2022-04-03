import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../modules/Restaurants/Pages/Index';
function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
    </Routes>
  );
}

export default App;
