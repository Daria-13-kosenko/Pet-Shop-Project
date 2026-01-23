import styles from './Footer.module.css'
import Instagram from '../../assets/icons/instagram.svg'
import Whatsap from '../../assets/icons/whatsapp.svg'
import Map from '../../assets/img/map.svg'

function Footer() {
  return (
    <footer className={styles.footer}>
      <h1>Contact</h1>
      <div className={styles.contact}>
        <div className={styles.card}>
          <span className={styles.label}>Phone</span>
          <b>+49 30 915-88492</b>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Socials</span>
          <div className={styles.icons}>
            <img src={Instagram} />
            <img src={Whatsap} />
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Address</span>
          <b>Wallstraße 9-13, 10179 Berlin, Deutschland</b>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Working Hours</span>
          <b>24 hours a day</b>
        </div>
      </div>
      <div className={styles.map}>
        <img src={Map} />
      </div>
    </footer>
  )
}

export default Footer
