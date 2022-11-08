const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length > 0 
    ? blogs[blogs.reduce((largest, item, index) => {
      return blogs[largest].likes < item.likes ? index : largest
    }, 0)] 
    : false
}

const mostBlogs = (blogs) => {
  const groupedBlogs = blogs.reduce((result, value) => {
    result[value.author] = result[value.author] + 1 || 1
    return result
  }, [])

  return Object.keys(groupedBlogs).reduce((most, item) => {
    return groupedBlogs[item] > most.blogs 
      ? { author: item, blogs: groupedBlogs[item] }
      : most
  }, { author: '', blogs: 0 })
}

const mostLikes = (blogs) => {
  const groupedLikes = blogs.reduce((result, value) => {
    result[value.author] = result[value.author] + value.likes || value.likes
    return result
  }, [])

  return Object.keys(groupedLikes).reduce((most, item) => {
    return groupedLikes[item] > most.likes
      ? { author: item, likes: groupedLikes[item] }
      : most
  }, { author: '', likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}