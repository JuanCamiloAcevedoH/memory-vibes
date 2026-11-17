import { useState } from 'react';

// GIFs temporales mientras conectamos la API real de GIPHY en el siguiente paso
const PRESET_GIFS = [
  {
    id: 'party-cat',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW54Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6/3o7TKSjRrfIPjeiVyM/giphy.gif',
    title: 'Party time'
  },
  {
    id: 'chill-vibes',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG54Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6/l0HlHFRbmaZtBRhXG/giphy.gif',
    title: 'Chill vibes'
  },
  {
    id: 'hacker-cat',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY254Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6/JIX9t2j0ZTN9S/giphy.gif',
    title: 'Coding mode'
  },
  {
    id: 'happy-dance',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW54Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6Z3p6/l41lFw057lAJQMwg0/giphy.gif',
    title: 'Happy dance'
  }
];

function MemoryFormModal({ isOpen, onClose, onSaveMemory }) {
  // 1. Estados controlados para cada campo del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de hoy por defecto
  const [tagsInput, setTagsInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [selectedGif, setSelectedGif] = useState(PRESET_GIFS[0]);

  // 2. Renderizado condicional temprano: si el modal está cerrado, no renderizamos nada en el DOM
  if (!isOpen) return null;

  // 3. Manejador para leer la imagen seleccionada desde el dispositivo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result); // Guardamos la imagen lista para mostrarse
    };
    reader.readAsDataURL(file);
  };

  // 4. Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página (comportamiento clásico de HTML)

    if (!title.trim() || !photoPreview) {
      alert('Por favor agrega una foto y un título para tu recuerdo.');
      return;
    }

    // Transformamos el texto "amigos, fiesta" en un array limpio ["amigos", "fiesta"]
    const formattedTags = tagsInput
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag !== '');

    // Construimos el objeto respetando nuestro Contrato de Datos
    const newMemory = {
      id: `mem_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      date,
      photoUrl: photoPreview,
      gif: selectedGif,
      tags: formattedTags.length > 0 ? formattedTags : ['recuerdo']
    };

    // Enviamos el objeto al componente padre (App.jsx)
    onSaveMemory(newMemory);

    // Limpiamos el formulario y cerramos el modal
    setTitle('');
    setDescription('');
    setTagsInput('');
    setPhotoPreview('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation evita que hacer clic dentro del formulario cierre el modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Añadir Nuevo Recuerdo</h2>
          <button type="button" className="btn-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="memory-form">
          {/* Selector / Previsualización de Foto */}
          <div className="form-group">
            <label className="photo-upload-box">
              {photoPreview ? (
                <img src={photoPreview} alt="Vista previa" className="photo-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span>📷</span>
                  <p>Haz clic para subir tu foto</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                hidden 
              />
            </label>
          </div>

          <div className="form-group">
            <label>Título del momento *</label>
            <input
              type="text"
              placeholder="Ej. Cumpleaños de Laura"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>¿Qué pasó este día?</label>
            <textarea
              rows="3"
              placeholder="Escribe un pensamiento o anécdota..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Etiquetas (separadas por coma)</label>
              <input
                type="text"
                placeholder="amigos, viaje, fiesta"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
          </div>

          {/* Selector de GIF Temático */}
          <div className="form-group">
            <label>Elige la vibra (GIF Temático)</label>
            <div className="gif-grid-selector">
              {PRESET_GIFS.map((gif) => (
                <button
                  type="button"
                  key={gif.id}
                  className={`gif-option ${selectedGif.id === gif.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGif(gif)}
                >
                  <img src={gif.url} alt={gif.title} />
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar en Álbum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemoryFormModal;