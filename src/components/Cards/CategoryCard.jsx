import styles from './CategoryCard.module.css'
import { getCategoryImageUrl } from '../../utils/image'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ category }) {
  const navigate = useNavigate()

  if (!category) return null

  const categoryId = category?.id ?? category?._id
  const title = category?.title ?? category?.name ?? 'Category'

  const goToCategory = () => {
    if (!categoryId) return
    navigate(`/categories/${categoryId}`)
  }

  return (
    <div
      className={styles.card}
      onClick={goToCategory}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') goToCategory()
      }}
    >
      {categoryId ? (
        <img
          className={styles.cardImage}
          src={getCategoryImageUrl(categoryId)}
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : null}

      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default CategoryCard
