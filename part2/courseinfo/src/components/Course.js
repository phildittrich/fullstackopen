import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} excersises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const sum = parts.reduce( (sum, part) =>
    sum += part.exercises
  , 0 )

  return (
    <>
    {parts.map( part => 
      <Part
        key={part.id}
        part={part} 
      />
    )}
    <Total 
      sum={sum}
    />
  </>
  )
}


const Course = ({ course }) => 
  <>
    <Header 
      course={course.name} 
    />
    <Content 
      parts={course.parts} 
    />
  </>

export default Course