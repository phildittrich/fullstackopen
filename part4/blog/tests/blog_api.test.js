const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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
    
  expect(response.body).toHaveLength(2)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})