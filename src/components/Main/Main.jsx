import { useNavigate } from 'react-router-dom'
import Categories from '../Categories/Categories'
import SaleSection from '../Sales/SaleSection'
import RegistrSale from '../Registr_sale/RegistrSale'
import styles from './Main.module.css'

function Main() {
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <div className={styles.overlay}>
        <h1>
          Amazing Discounts <br />
          on Pets Products!
        </h1>
        <button className={styles.button} onClick={() => navigate('/products')}>
          Check out
        </button>
      </div>
      <Categories limit={4} />
      <RegistrSale />
      <SaleSection />
    </div>
  )
}

export default Main
