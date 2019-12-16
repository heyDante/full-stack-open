const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const arrOfLikes = blogs.map( (blog) => {
    return blog.likes;
  });

  return arrOfLikes.reduce( (acc, curr) => acc + curr, 0);
};

module.exports = {
  dummy,
  totalLikes
};