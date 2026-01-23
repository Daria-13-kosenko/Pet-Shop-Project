import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/icons/logo.svg'
import Basket from '../../assets/icons/basket.svg'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </NavLink>
      </div>

      <div className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Main Page{' '}
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Categories
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          All products
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          All sales
        </NavLink>
      </div>

      <NavLink to="/basket" className={styles.basket}>
        <img src={Basket} alt="Basket" />
      </NavLink>
    </header>
  )
}

export default Header
