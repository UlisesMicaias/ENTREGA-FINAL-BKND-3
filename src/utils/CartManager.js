import { Cart } from '../models/Cart.js';

export default class CartManager {

    async createCart() {
        const cart = new Cart({ products: [] });
        return await cart.save();
    }


    async getCartById(cid) {
        return await Cart.findById(cid).populate('products.product').lean();
    }

    async addProductToCart(cid, pid) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;

        const index = cart.products.findIndex(p => p.product.toString() === pid);
        if (index !== -1) {
            cart.products[index].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        return cart.populate('products.product');
    }


    async updateProductQuantity(cid, pid, quantity) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;

        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (!productInCart) return null;

        productInCart.quantity = quantity;
        await cart.save();
        return cart.populate('products.product');
    }

    async removeProductFromCart(cid, pid) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        return cart.populate('products.product');
    }


    async clearCart(cid) {
        const cart = await Cart.findById(cid);
        if (!cart) return null;

        cart.products = [];
        await cart.save();
        return cart;
    }
}