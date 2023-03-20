import styles from './Footer.module.css';

function Footer() {

  return (
    <div className={styles.footer}>
        <span>Desenvolvido por: <a href="https://www.linkedin.com/in/jpbenjamim/" target="_blank" rel="noreferrer">Jonas Benjamim (CPD)</a> - Realengo</span>
    </div>
  )
}

export { Footer }
