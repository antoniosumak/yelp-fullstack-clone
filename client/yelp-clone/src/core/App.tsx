import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../modules/Restaurants/Pages/Index';
import IndexReview from '../modules/Reviews/Pages/Index';
function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/restaurants/:id/review' element={<IndexReview />} />
    </Routes>
  );
}

export default App;
