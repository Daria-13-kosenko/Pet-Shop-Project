import styles from './CategoryCard.module.css'
import { getCategoryImageUrl } from '../../utils/image'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ category }) {
  const navigate = useNavigate()

  const id = category?.id ?? category?._id
  const title = category?.title ?? category?.name ?? 'Category'

  const goToCategory = () => {
    if (!id) return
    navigate(`/categories/${id}`)
  }

  return (
    <div
      className={styles.card}
      onClick={goToCategory}
      role="button"
      tabIndex={0}
    >
      <div>
        <img
          className={styles.cardImage}
          src={getCategoryImageUrl(id)}
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  )
}

export default CategoryCard
