import React from 'react'
import styles from './Hero.module.css'
import hero1 from '../../../assets/images/main-course.png'
import hero2 from '../../../assets/images/drink.png'

function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Смак. Настрій. Атмосфера
      </h1>
      <p className={styles.subtitle}>
        Місце, де їжа говорить мовою емоцій. Де кожна страва — історія, а кожен вечір — спогад
      </p>

      <div className={styles.buttons}>
        <button className={styles.orderBtn}>Зробити замовлення</button>
        <button className={styles.moreBtn}>Більше інформації</button>
      </div>

      <div className={styles.images}>
        <img src={hero1} alt="Dish 1" />
        <img src={hero2} alt="Dish 2" />
      </div>
    </section>
  )
}

export default Hero
