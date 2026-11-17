import { useState } from 'react';
import { mockMemories } from './data/mockMemories';
import MemoryCard from './components/MemoryCard';
import MemoryFormModal from './components/MemoryFormModal';

function App() {
  const [memories, setMemories] = useState(mockMemories);
  // Estado booleano que controla si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función que recibe el nuevo recuerdo desde el hijo y actualiza el estado de forma inmutable
  const handleAddMemory = (newMemory) => {
    setMemories((prevMemories) => [newMemory, ...prevMemories]);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">📸</span>
          <h1>MemoryVibes</h1>
        </div>
        
        <button 
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Añadir Recuerdo
        </button>
      </header>

      <main className="main-content">
        <section className="gallery-header">
          <h2>Tarjetas de Recuerdos</h2>
          <span className="memory-count">{memories.length} recuerdos guardados</span>
        </section>

        <section className="memories-grid">
          {memories.map((item) => (
            <MemoryCard 
              key={item.id} 
              memory={item} 
            />
          ))}
        </section>
      </main>

      {/* Componente Modal */}
      <MemoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveMemory={handleAddMemory}
      />
    </div>
  );
}

export default App;