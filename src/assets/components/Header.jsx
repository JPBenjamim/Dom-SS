import React from 'react'

import logo from '/src/assets/dom.png'

import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.header}>
      <h1>Controle de fornecedores</h1>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} />
        <button className={styles.button}>Incluir</button>
      </div>
    </div>
  )
}
export default Header
