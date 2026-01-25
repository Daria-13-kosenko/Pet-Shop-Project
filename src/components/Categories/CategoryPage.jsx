import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './CategoriesPage.module.css'
import CategoryCard from '../Cards/CategoryCard'
import { fetchCategories } from '../../redux/features/categories/categoriesSlice'

function CategoriesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { list = [] } = useSelector((state) => state.categories || {})

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className={styles.page}>
      <div className={styles.topLine}>
        <nav className={styles.breadcrumbs}>
          <button
            type="button"
            className={styles.smallBtn}
            onClick={() => navigate('/')}
          >
            Main page
          </button>
          <span className={styles.sep}></span>
          <button type="button" className={styles.active}>
            Categories
          </button>
        </nav>
      </div>

      <h1 className={styles.title}>Categories</h1>

      <div className={styles.grid}>
        {list.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            onClick={() => navigate(`/categories/${category.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
