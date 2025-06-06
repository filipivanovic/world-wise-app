import styles from './Sidebar.module.css'
import Logo from './Logo.jsx'
import AppNav from './AppNav.jsx'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>list of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; 2021 WorldWise.</p>
      </footer>
    </div>
  )
}

export default Sidebar