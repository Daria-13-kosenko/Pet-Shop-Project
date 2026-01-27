import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './CategoriesPage.module.css'
import CategoryCard from '../Cards/CategoryCard'
import { fetchCategories } from '../../redux/features/categories/categoriesSlice'

function CategoriesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { categories, loading, error } = useSelector((s) => s.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  if (loading) return <div className={styles.page}>Loading...</div>
  if (error) return <p className={styles.page}>Error: {String(error)}</p>

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

      {Array.isArray(categories) && categories.length === 0 ? (
        <p></p>
      ) : (
        <div className={styles.grid}>
          {categories.map((category, idx) => {
            const key = category?.id ?? category?._id ?? idx
            return <CategoryCard key={String(key)} category={category} />
          })}
        </div>
      )}
    </div>
  )
}

export default CategoriesPage
