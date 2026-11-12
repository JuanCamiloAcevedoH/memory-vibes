import { useState } from 'react';
import { mockMemories } from './data/mockMemories';
import MemoryCard from './components/MemoryCard';

function App() {
  // Estado principal que almacena la lista de recuerdos
  const [memories, setMemories] = useState(mockMemories);

  return (
    <div className="app-container">
      {/* Barra superior (Header) */}
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">📸</span>
          <h1>MemoryVibes</h1>
        </div>
        
        <button className="btn-primary">
          + Añadir Recuerdo
        </button>
      </header>

      {/* Contenido Principal */}
      <main className="main-content">
        <section className="gallery-header">
          <h2>Tarjetas de Recuerdos</h2>
          <span className="memory-count">{memories.length} recuerdos guardados</span>
        </section>

        {/* Cuadrícula Responsiva (Grid) */}
        <section className="memories-grid">
          {memories.map((item) => (
            <MemoryCard 
              key={item.id} 
              memory={item} 
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;