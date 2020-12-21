import axios from 'axios';

const cepURI = 'https://viacep.com.br/ws/';

const consultCep = async (cep) => {
  try {
    const response = await axios.get(`${cepURI}/${cep}/json`);

    return response.data;
  } catch (err) {
    throw err;
  }
}

export default consultCep;