import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connectToDb = async ({ poolSize = 1, databaseUrl = process.env.DATABASE_URL } = {}) => {
  try {
    return mongoose.connect(databaseUrl,
      {
        poolSize,
        useNewUrlParser: true,
        useUnifiedTopology: true,

      })
      .then(() => {
        console.log('Connected on DB');
      });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default connectToDb;
