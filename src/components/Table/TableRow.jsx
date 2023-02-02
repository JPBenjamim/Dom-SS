import TableData from './TableData'

function TableRow({ data, sector }) {
  return (
    <tbody>
      {data.map((value, key) => {
        return <TableData key={key} data={value} sector={sector} />
      })}
    </tbody>
  )
}
export default TableRow
