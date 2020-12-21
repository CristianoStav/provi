import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },
  phoneNumber: {
    type: Number,
    required: false
  },
  address: {
    type: Object,
    required: false
  },
  request_amount: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

userSchema.index({
  cpf: 1,
  firstName: 1,
  lastName: 1,
  birthday: 1,
  phoneNumber: 1,
  address: 1,
}, { unique: true, sparse: true });

const User = model('User', userSchema);

export default User;