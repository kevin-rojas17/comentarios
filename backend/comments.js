const express = require('express');
const router = express.Router();
const Comment = require('./comment');

// Obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });  // Obtener los comentarios ordenados por fecha
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo comentario
router.post('/', async (req, res) => {
    const comment = new Comment({
        content: req.body.content,
        author: req.body.author,
        rating: req.body.rating
    });

    try {
        const newComment = await comment.save();  // Guardar el comentario en la base de datos
        res.status(201).json(newComment);  // Responder con el comentario creado
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un comentario
router.patch('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        if (req.body.content) comment.content = req.body.content;
        if (req.body.author) comment.author = req.body.author;
        if (req.body.rating) comment.rating = req.body.rating;

        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un comentario
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        await comment.remove();
        res.json({ message: 'Comentario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
