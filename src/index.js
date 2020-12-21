import 'dotenv/config';
import app from './config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});