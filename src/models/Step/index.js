import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  step: {
    type: String,
    required: true,
    enum: ['cpf', 'full-name', 'birthday', 'phone', 'address']
  }
});

const Step = model('Step', schema);

export default Step;