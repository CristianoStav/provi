import * as Helpers from './helpers';

class UserController {
  constructor({ UserRepository, StepRepository, cpfValidator, cepService }) {
    this.UserRepository = UserRepository;
    this.StepRepository = StepRepository;
    this.cpfValidator = cpfValidator;
    this.cepService = cepService;
    this.show.bind(this);
    this.updateName.bind(this);
    this.updateCPF.bind(this);
    this.updateBirthday.bind(this);
    this.updatePhone.bind(this);
    this.updateAddress.bind(this);
    this.apiURL = '/api/v1';
  };

  async show(req, res) {
    const { token } = req;

    const user = await this.UserRepository.findById(token._id);

    if (!user) {
      return res.status(404).json({ err: 'user not found' });
    }

    return res.status(200).json(user);
  };

  async updateCPF(req, res) {
    try {
      const { token } = req;
      const { cpf } = req.body;
      const cpfIsValid = this.cpfValidator.isValid(cpf);

      if (!cpfIsValid) {
        return res.status(400).json({ err: 'CPF is not valid' });
      }

      await this.UserRepository.updateById(token._id, { cpf });
      const nextStep = await this.StepRepository.updateByUser(token._id, 'full-name');

      return res.status(200).json({ sucess: true, 'next-end-point': `${this.apiURL}/${nextStep.step}` });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  async updateName(req, res) {
    try {
      const { token } = req;
      const { full_name } = req.body;

      const name = Helpers.splitName(full_name);

      await this.UserRepository.updateById(token._id, name);
      const nextStep = await this.StepRepository.updateByUser(token._id, 'birthday');

      return res.status(200).json({ sucess: true, 'next-end-point': `${this.apiURL}/${nextStep.step}` });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  async updateBirthday(req, res) {
    try {
      const { token } = req;
      const { birthday } = req.body;

      const validDate = Helpers.createValidDate(birthday);

      await this.UserRepository.updateById(token._id, { birthday: validDate });
      const nextStep = await this.StepRepository.updateByUser(token._id, 'phone');

      return res.status(200).json({ sucess: true, 'next-end-point': `${this.apiURL}/${nextStep.step}` });

    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  async updatePhone(req, res) {
    try {
      const { token } = req;
      const { phone } = req.body;

      await this.UserRepository.updateById(token._id, { phone });
      const nextStep = await this.StepRepository.updateByUser(token._id, 'address');

      return res.status(200).json({ sucess: true, 'next-end-point': `${this.apiURL}/${nextStep.step}` });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

  async updateAddress(req, res) {
    try {
      const { token } = req;
      const { cep, street, number, complement, city, state, } = req.body;

      const address = await this.cepService(cep);
      if (address.erro) {
        return res.status(400).json({ err: 'ivalid CEP' });
      }

      const isValidAddress = Helpers.validateAddress(address, { cep, street, number, complement, city, state });
      if (isValidAddress) {
        return res.status(400).json({ err: isValidAddress.erro });
      }

      delete req.body.access_token;
      await this.UserRepository.updateById(token._id, { address: { ...req.body } });
      const nextStep = await this.StepRepository.updateByUser(token._id, 'request_amount');

      return res.status(200).json({ sucess: true, 'next-end-point': `${this.apiURL}/${nextStep.step}` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  async requestAmount(req, res) {
    try {
      const { token } = req;
      const { request_amount } = req.body;

      await this.UserRepository.updateById(token._id, { request_amount })
      const nextStep = await this.StepRepository.updateByUser(token._id, 'request_amount');

      return res.status(200).json({ sucess: true, 'next-end-point': `${this.apiURL}/${nextStep.step}` });
    } catch (err) {
      return req.status(500).json({ err: err.message });
    }
  };

};

export default UserController;