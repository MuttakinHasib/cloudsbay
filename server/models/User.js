import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: Array,
      default: [],
    },
    address: { type: String },
    // wishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  },
  { timestamp: true }
);

const User = mongoose.model('User', userSchema);

export default User;
