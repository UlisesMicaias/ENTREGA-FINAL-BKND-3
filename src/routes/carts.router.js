import express from 'express';
import CartManager from '../utils/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();


router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'ID inválido' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        if (!updatedCart) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Datos inválidos' });
    }
});


router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        if (!quantity || quantity < 1) return res.status(400).json({ status: 'error', message: 'Cantidad inválida' });
        const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        if (!updatedCart) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Datos inválidos' });
    }
});


router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
        if (!updatedCart) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Datos inválidos' });
    }
});


router.delete('/:cid', async (req, res) => {
    try {
        const emptiedCart = await cartManager.clearCart(req.params.cid);
        if (!emptiedCart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', message: 'Carrito vaciado' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Datos inválidos' });
    }
});

export default router;

