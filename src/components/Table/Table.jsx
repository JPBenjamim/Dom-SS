import { Table } from 'react-bootstrap'
import TableRow from './TableRow'

import TableHeaders from './TableHeaders'

import { data } from './data'

function FormAdd() {
  return (
    <Table>
      <thead>
        <TableHeaders />
      </thead>
      <TableRow data={data} />
    </Table>
  )
}

export default FormAdd
