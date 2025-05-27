import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  year: { type: Number },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model('Product', productSchema);

