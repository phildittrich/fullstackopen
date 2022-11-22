const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { text } = require('express')

beforeEach(async() => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
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
    .expect(400)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})