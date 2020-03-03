import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} - <span style={{fontStyle: 'italic'}}>{blog.author}</span>
  </div>
)

export default Blog