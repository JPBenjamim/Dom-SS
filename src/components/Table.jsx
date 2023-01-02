import styles from './Table.module.css'
  

const data = [
  { suppliersName: "Danone", idNotes: 237450, hour: "07:25", quantity: "2 Plt", load: "Fria", isSchedule: "Sim",},
  { suppliersName: "Ambev", idNotes: "Ver notas", hour: "08:30", quantity: "14 Plt", load: "Seca", isSchedule: "Não",},
  { suppliersName: "Coca-cola", idNotes: "Ver notas", hour: "08:40", quantity: "7 Plt", load: "Seca", isSchedule: "Não",},
  { suppliersName: "Unilever", idNotes: "Ver notas", hour: "09:15", quantity: "45 Vol", load: "Seca", isSchedule: "Sim",},
 
]

function Table() {
  return (
    <div  className={styles.contentainer}>
      <table className={styles.content}>
        <thead>
          <tr>
            <th>Fornecedor</th>
            <th>Nota</th>
            <th>Hora</th>
            <th>Quantidade</th>
            <th>Carga</th>
            <th>Agendada</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.suppliersName}</td>
                  <td>{value.idNotes}</td>
                  <td>{value.hour}</td>
                  <td>{value.quantity}</td>
                  <td>{value.load}</td>
                  <td>{value.isSchedule}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table ;
