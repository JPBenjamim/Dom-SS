function TableData({ data }) {
  return (
    <tr>
          
            <td>{data.suppliersName}</td>
            <td>{data.idNotes}</td>
            <td>{data.hour}</td>
            <td>{data.quantity}</td>
            <td>{data.load}</td>
            <td>{data.isSchedule}</td>
              
        </tr>
  )
}
export default TableData