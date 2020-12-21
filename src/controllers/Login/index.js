import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET;

class LoginController {
  constructor({ UserModel, StepModel }) {
    this.userModel = UserModel;
    this.stepModel = StepModel;
    this.register.bind(this);
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;

      const userExists = await this.userModel.findOne({ email: email }).lean();

      if (userExists) {
        return res.status(409).json({ err: 'email already registred' });
      }

      const user = await this.userModel.create({ email, password });
      await this.stepModel.create({ user: user._id, step: 'cpf' });

      const access_token = jwt.sign({ _id: user.toObject()._id }, secretKey);

      return res.status(201).json({ access_token });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };
}

export default LoginController;