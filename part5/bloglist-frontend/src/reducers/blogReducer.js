import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return [...action.data];

    case 'ADD_BLOG':
      return [...state, action.data];

    case 'ADD_LIKE': {
      const updatedBlog = action.data;
      return state.map((blog) => {
        return blog.id !== updatedBlog.id
          ? blog
          : updatedBlog;
      });
    }

    case 'DELETE_BLOG': {
      const blogToDelete = action.data;
      return state.filter((blog) => blog.id !== blogToDelete.id);
    }

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

export const addLike = (blog) => {
  return async (dispatch) => {
    const modifiedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    dispatch({
      type: 'ADD_LIKE',
      data: modifiedBlog
    });
    await blogService.addLikes(modifiedBlog, blog.id);
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    });
    await blogService.removeBlog(blog.id);
  };
};

export default blogReducer;