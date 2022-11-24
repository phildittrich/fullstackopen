const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

let token
let savedUser

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'test', passwordHash })

  savedUser = await user.save()

  const login = {
    username: 'test',
    password: 'secret'
  }

  const response = await api
    .post('/api/login')
    .send(login)

  token = response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog({ user: savedUser._id, ...blog }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blog api returns the expected number of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  expect(response.body).toHaveLength(2)
}, 100000)

test('expect the unique identifier to be named id', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
}, 100000)

test('expect post request to add a new blog', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Blog Enthusiast',
    url: 'https://blog3.com',
    likes: 30
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain(
    'Blog 3'
  )
}, 100000)

test('expect missing likes to default to zero', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Blog Enthusiast',
    url: 'https://blog3.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const savedBlog = response.body.find(r => r.title === newBlog.title)

  expect(savedBlog.likes).toBe(0)
}, 100000)

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Jens Dirk',
    url: 'https://url.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
}, 100000)

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.content)
}, 100000)

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 30

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `bearer ${token}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  const updatedBlog = blogsAtEnd.find(r => r.id === blogToUpdate.id)

  expect(updatedBlog.likes).toBe(30)
}, 100000)


afterAll(() => {
  mongoose.connection.close()
})