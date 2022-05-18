import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Index } from './pages';
import { Generate } from './pages/generate';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/generate" element={<Generate />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
