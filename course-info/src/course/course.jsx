import Content from './components/content'
import Header from './components/header'
import Total from './components/total'

const Course = ({course}) => {
    const title = course.name
    const parts = course.parts

    return (
        <div>
            <Header course={title} />
            <Content parts = {parts}/>
            <Total parts = {parts} />
        </div>
    )
}
export default Course