const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={`part-${part.name}`} part={part} /> )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ total }) => <p style={{ fontWeight: 'bold' }}>Number of exercises {total}</p>

const Course = (props) => {
  const { name, parts } = props

  const total = parts.reduce((prev, acc) => prev += acc.exercises,  0)

  return (
    <section>
      <Header name={name} />
      <Content parts={parts} />

      <Total total={total} />
    </section>
  )
}

export default Course
