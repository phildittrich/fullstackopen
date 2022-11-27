const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
    
  response.json(blogs)
})

blogsRouter.post('/',  userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',  userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(b => b.toString() !== blog.id )
    await user.save()
    return response.status(204).end()
  } 
  
  return response.status(401).json({ error: 'token missing or invalid'})
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.autor,
    likes: body.likes,
    url: body.url,
    user: body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user')

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter