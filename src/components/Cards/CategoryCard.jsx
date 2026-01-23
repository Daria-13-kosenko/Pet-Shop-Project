import styles from './CategoryCard.module.css'
import { getCategoryImageUrl } from '../../utils/image'
import { NavLink } from 'react-router-dom'

function CategoryCard({ id, title, onClick }) {
  return (
    <div className={styles.card}>
      <div>
        <img
          className={styles.cardImage}
          src={getCategoryImageUrl(id)}
          alt={title}
          onClick={onClick}
        ></img>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  )
}

export default CategoryCard
