const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      }
    )
  }
    <p>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
    </div>
  )
}

export default Course