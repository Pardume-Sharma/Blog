import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
      },
    ],
    role: { type: String, default: "user" },
  },
  { minimize: false }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;
