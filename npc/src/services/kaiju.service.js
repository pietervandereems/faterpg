import axios from 'axios';

const baseUrl = 'http://localhost:3001/kaiju';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const update = async (aspects) => {
  const response = await axios.put(baseUrl, aspects);
  return response.data;
};

export default { getAll, update };
