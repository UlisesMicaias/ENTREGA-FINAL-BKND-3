import express from 'express';
import ProductManager from '../utils/ProductManager.js';

const router = express.Router();
const productsManager = new ProductManager();


router.get('/', async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        let sort = {};
        if (req.query.sort) {
            const [field, order] = req.query.sort.split('_');
            sort[field] = order === 'asc' ? 1 : -1;
        }


        let query = {};
        if (req.query.query) {
            const regex = new RegExp(req.query.query, 'i'); 
            query = {
                $or: [
                    { genre: regex },
                    { artist: regex },
                    { title: regex }
                ]
            };
        }

        const result = await productsManager.getProducts(page, limit, query, sort);
        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const product = await productsManager.getProductById(req.params.id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'ID inválido' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { title, artist, genre, year, price, stock, image } = req.body;
        if (!title || !artist || !price) {
            return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios: title, artist, price' });
        }
        const productData = { title, artist, genre, year, price, stock, image };
        const product = await productsManager.addProduct(productData);
        res.status(201).json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productsManager.updateProduct(req.params.id, req.body);
        if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'ID inválido o datos incorrectos' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await productsManager.deleteProduct(req.params.id);
        if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'ID inválido' });
    }
});

export default router;
