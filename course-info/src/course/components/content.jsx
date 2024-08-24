import Part from './content-parts/part'

const Content = ({parts}) => {
    return (
        <>
        {parts.map(part =>
          <Part key = {part.id} part = {part} />
        )}
      </>
    )
    
}
export default Content