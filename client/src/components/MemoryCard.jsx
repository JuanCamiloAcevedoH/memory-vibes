// Recibimos { memory } desestructurado desde las props del componente padre
function MemoryCard({ memory }) {
  return (
    <article className="memory-card">
      {/* Contenedor visual: Foto principal + GIF superpuesto */}
      <div className="memory-media">
        <img 
          src={memory.photoUrl} 
          alt={memory.title} 
          className="memory-photo" 
        />
        
        {/* Renderizado condicional: Solo dibujamos el GIF si el recuerdo tiene uno */}
        {memory.gif && (
          <div className="memory-gif-badge">
            <img 
              src={memory.gif.url} 
              alt={memory.gif.title} 
              className="memory-gif" 
            />
          </div>
        )}
      </div>

      {/* Información del recuerdo */}
      <div className="memory-content">
        <span className="memory-gif-tag">
          GIF Tema: {memory.gif?.title || 'Sin tema'}
        </span>
        
        <h3 className="memory-title">{memory.title}</h3>
        <p className="memory-description">{memory.description}</p>
        
        <div className="memory-footer">
          <time className="memory-date">📅 {memory.date}</time>
          
          {/* Renderizado de listas con .map() */}
          <div className="memory-tags">
            {memory.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default MemoryCard;