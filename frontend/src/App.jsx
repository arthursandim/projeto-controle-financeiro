import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CategoriaList from './components/Categoria/CategoriaList';
import ContaList from './components/Conta/ContaList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <h1>💰 Controle de Gastos</h1>
          <ul>
            <li><Link to="/">Contas</Link></li>
            <li><Link to="/categorias">Categorias</Link></li>
          </ul>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<ContaList />} />
            <Route path="/categorias" element={<CategoriaList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
