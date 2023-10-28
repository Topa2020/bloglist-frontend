import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  background : 'lightgrey',
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [allInfo, setAllInfo] = useState(false)

  return (
  <div style={blogStyle}>
    <p>{blog.title}, {blog.author}{' '} 
    <span onClick={() => setAllInfo(!allInfo)}>
      <button>{allInfo ? 'hide' : 'view'}</button>
    </span></p>
  
    {allInfo ? (
    <div>
    <p>{blog.url} </p>
    <p>likes {blog.likes} </p>
    <button onClick={() => addLike(blog.id)}>like</button>
    <p>{blog.user.name}</p>
    {user.username === blog.user.username &&
    <button onClick={() => removeBlog(blog.id)}>remove</button>}
    </div>
    ) : null}
  </div>
)}

export default Blog