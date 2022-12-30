import styles from './Table.module.css'

function Table() {
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr className={styles.container}>
              <th>Fornecedor</th>
              <th>Hora</th>
              <th>Notas</th>
              <th>QTD</th>
              <th>Liberada</th>
              <th>Conferida</th>
              <th>Agendada</th>
            </tr>
          </thead>
          <tbody className={styles.content}>
            <td>Danone</td>
            <td>09:27</td>
            <td>213771</td>
            <td>14</td>
            <td>Sim</td>
            <td>Sim</td>
            <td>Sim</td>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Table };
