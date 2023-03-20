import Modal from './Modal'

import logo from '../assets/dom.png'

import styles from './Header.module.css'

function Header({sector}) {
  return (
    <div className="d-flex justify-content-between align-items-center bg-withe mt-4 container-fluid">
    <h1 className="mt-4 mb-4">Controle de fornecedores</h1>
    <div className="d-flex align-items-center">
    <img src={logo} className={styles.logo} alt="logo dom" style={{ maxWidth: '100%', height: 'auto' }} />

      {
        sector !== 'home' &&
        <Modal color="primary" name="Incluir" /> 
      }
    </div>
  </div>
  )
}
export default Header
