const dummy = (blogs) => {
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
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};