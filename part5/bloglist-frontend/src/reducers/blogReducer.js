import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return [...action.data];

    case 'ADD_BLOG':
      return [...state, action.data];

    default:
      return state;
  }
};

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    });
  };
};

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.createBlog(newBlog);
    dispatch({
      type: 'ADD_BLOG',
      data: savedBlog
    });
    const notificationMessage = `Added ${savedBlog.title} by ${savedBlog.author}`;
    dispatch(setNotification('created', notificationMessage, 3));
  };
};

export default blogReducer;