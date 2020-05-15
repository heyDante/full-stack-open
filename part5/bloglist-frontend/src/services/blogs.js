import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (userToken) => {
  token = `bearer ${userToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

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

const addLikes = async (updatedBlog, blogId) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog);
  return response.data;
};

const removeBlog = async (blogId) => {
  const headerConfig = {
    headers: {
      Authorization: token
    }
  };

  try {
    await axios.delete(`${baseUrl}/${blogId}`, headerConfig);
  } catch (error) {
    console.log('Error deleting: Note not created by user or invalid token');
  }
};

const addComment = async (id, comment) => {
  try {
    const url = `${baseUrl}/${id}/comments`;
    const response = await axios.post(url, { comment });
    return response.data;
  } catch (error) {
    console.log('Error adding comment');
  }
};

export default {
  getAll,
  createBlog,
  addLikes,
  removeBlog,
  setToken,
  addComment
};