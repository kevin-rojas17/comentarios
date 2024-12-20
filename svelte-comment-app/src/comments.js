const API_URL = 'http://localhost:5000/api/comments';


// Obtener todos los comentarios
export const fetchComments = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error fetching comments');
    return res.json();
};

// Crear un nuevo comentario
export const createComment = async (data) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error creating comment');
    return res.json();
};

// Actualizar un comentario
export const updateComment = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error updating comment');
    return res.json();
};

// Eliminar un comentario
export const deleteComment = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting comment');
    return res.json();
};
