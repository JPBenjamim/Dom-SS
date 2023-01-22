import TableData from './TableData'

function TableRow({ data }) {
  return (
    <tbody>
      {data.map((value, key) => {
        return <TableData key={key} data={value} />
      })}
    </tbody>
  )
}
export default TableRow
