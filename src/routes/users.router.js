// src/routes/users.router.js
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', async (req, res) => {
    // lógica para obtener usuarios
    res.send([{ id: 1, name: 'Usuario de ejemplo' }]);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (id === '1') {
        res.send({ id: 1, name: 'Usuario de ejemplo' });
    } else {
        res.status(404).send({ error: 'No encontrado' });
    }
});

export default router;
