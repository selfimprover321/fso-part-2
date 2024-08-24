const Total = ({parts}) => {
    const total = parts.reduce((sum, current) => sum + current.exercises, 0)
    return (
        <>
            <h4>total of {total} exercises</h4>
        </>
    )
}
export default Total