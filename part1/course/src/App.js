const Header = props => (
  <h1>{props.course}</h1>
)

const Content = ({parts}) => (
  <div>
    <Part part={parts[0].name} exercises={parts[0].exercises} />
    <Part part={parts[1].name} exercises={parts[1].exercises} />
    <Part part={parts[2].name} exercises={parts[2].exercises} />
  </div>
)

const Part = props => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = ({parts}) => {
  let total = 0
  parts.forEach( part => total = total+parseInt(part.exercises) )

  return (
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App