import { Product } from '../models/Product.js';

export default class ProductManager {

    async addProduct(data) {
        const product = new Product(data);
        return await product.save();
    }


    async getProducts(page = 1, limit = 10, query = {}, sort = {}) {
        const options = {
            page,
            limit,
            sort,
            lean: true,
        };
        return await Product.paginate(query, options);
    }

    async getProductById(id) {
        return await Product.findById(id).lean();
    }

    async updateProduct(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }


    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}

