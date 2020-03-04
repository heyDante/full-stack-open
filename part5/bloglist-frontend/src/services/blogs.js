import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (userToken) => {
  token = `bearer ${userToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  // console.log(token);
  const headerConfig = {
    headers: { 
      Authorization: token
    }
  };

  const response = await axios.post(baseUrl, newBlog, headerConfig);
  return response.data;
};

export default { 
  getAll,
  createBlog,
  setToken
}