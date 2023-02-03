import Modal from './Modal'

import logo from '../assets/dom.png'

import styles from './Header.module.css'

function Header({sector}) {
  return (
    <div className={styles.header}>
      <h1>Controle de fornecedores</h1>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} alt="logo dom"/>
        {
          sector !== 'home' &&
          <Modal color="primary" name="Incluir" /> 
        }
      </div>
    </div>
  )
}
export default Header
