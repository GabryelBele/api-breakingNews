import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  username: {
    type: String,
    require:true
  },
  email: {
    type: String,
    lowercase: true,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require:true
  },
  background: {
    type: String,
    require:true
  }
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
