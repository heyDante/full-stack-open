const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const arrOfLikes = blogs.map( (blog) => {
    return blog.likes;
  });

  return arrOfLikes.reduce( (acc, curr) => acc + curr, 0);
};

const favoriteBlog = (blogs) => {
  const arrOfLikes = blogs.map( (blog) => {
    return blog.likes;
  });

  const indexOfHighestLikes = arrOfLikes.indexOf(Math.max(...arrOfLikes));

  const blog = blogs[indexOfHighestLikes];

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  };
};

// const mostBlogs = (blogs) => {

//   const arrayOfUsersWithMostBlog = [];

//   blogs.forEach((blog) => {
//     let author = blog.author;
//     arrayOfUsersWithMostBlog.find((eachBlog))
//   });
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};