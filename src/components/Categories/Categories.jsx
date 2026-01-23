import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../redux/features/categories/categoriesSlice'
import CaregoryCard from '../Cards/CategoryCard'
import { useNavigate } from 'react-router-dom'
import styles from './Categories.module.css'
import { NavLink } from 'react-router-dom'

function Categories({ limit }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list = [] } = useSelector((state) => state.categories || {})

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const visible = limit ? list.slice(0, limit) : list

  return (
    <div>
      <div className={styles.catigories}>
        <h1>Categories</h1>
        <div className={styles.line}></div>
        <NavLink to="/categories/:id">
          <button className={styles.btnCategories}>All categories</button>
        </NavLink>
      </div>
      <div className={styles.grid}>
        {visible.map((category) => (
          <CaregoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            onClick={() => navigate('/categories')}
          />
        ))}
      </div>
    </div>
  )
}

export default Categories
