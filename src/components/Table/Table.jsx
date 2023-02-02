import { Table } from 'react-bootstrap'
import TableRow from './TableRow'

import TableHeaders from './TableHeaders'

import { data } from './data'

function FormAdd({sector}) {
  return (
    <Table>
      <thead>
        <TableHeaders />
      </thead>
      <TableRow data={data} sector={sector} />
    </Table>
  )
}

export default FormAdd
