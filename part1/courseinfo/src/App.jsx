import { Component } from "react"

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
      <div id='Content'>
        <Part part={props.course.parts[0]} />  
        <Part part={props.course.parts[1]} />  
        <Part part={props.course.parts[2]} />  
      </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  let tot = 0
  props.course.parts.forEach(value => {
    tot += value.exercises
  })
  return (
    <p>Number of exercises {tot}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { 
      name:'Fundamentals of React',
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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App