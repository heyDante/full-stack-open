import axios from 'axios';

const baseURL = '/api/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then( (response) => response.data );
}

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then( (response) => response.data);
}

const modifyContact = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then( (response) => response.data);
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then( (response) => response);
}

export default { getAll, create, modifyContact, deleteContact };