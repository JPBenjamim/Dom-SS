import Modal from '../Modal'

function TableData({ data = {}, sector }) {
  return (
    <tr>  
      <td>{data.providerName}</td>
      <td>{data.idNotes}</td>
      <td>{data.hour}</td>
      <td>{data.quantity}</td>
      <td>{data.loadType}</td>
      <td>{data.isSchedule ? "Sim" : "Não"}</td>
      <td>
        {
        sector !== 'home' &&
          <Modal color="warning" name="Editar" typeModal="edit" dataDetails={data}/> 
        }
      </td>
      <td>
        {
        sector !== 'home' &&
          <Modal color="success" name="Liberar nota" typeModal="releaseNote" dataDetails={data}/> 
        }
      </td>
    </tr>
  )
}
export default TableData