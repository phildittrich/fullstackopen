const blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Blog Author',
    url: 'https://blog1.com',
    likes: 10
  },
  {
    title: 'Blog 2',
    author: 'Blog Writer',
    url: 'https://blog2.com',
    likes: 20
  },
]

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, 
  blogsInDb,
  usersInDb,
}