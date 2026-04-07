const Course = ({course}) => {
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={ course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part}/>)}
    
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({total}) => <p><strong>Total of {total} exercises</strong></p>

export default Course