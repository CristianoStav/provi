
const splitName = (name) => {
  const [firstName, ...lastName] = name.split(' ');

  return { firstName, lastName: lastName.join(' ') };
};

const createValidDate = (dateString) => {
  const [day, month, year] = dateString.split('/');

  const date = new Date(`${year}-${month}-${day}`);
  date.setHours(date.getHours() + 3);

  return date;
};

const validateAddress = (apiAddress, address) => {
  if (apiAddress.logradouro !== address.street) {
    return { erro: 'street is incorrect' }
  }

  if (apiAddress.uf !== address.state) {
    return { erro: 'state is incorrect' }
  }

  if (apiAddress.localidade !== address.city) {
    return { erro: 'city is incorrect' }
  }

  return undefined;
};

export { splitName, createValidDate, validateAddress };

