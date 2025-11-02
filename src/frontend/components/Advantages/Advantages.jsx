import React from 'react'
import styles from './Advantages.module.css'
import adv1 from '../../../assets/images/advantage1.png'
import adv2 from '../../../assets/images/advantage2.png'
import adv3 from '../../../assets/images/advantage3.png'

const advantages = [
  {
    title: 'Неповторний смак',
    img: adv1,
    description: 'Наші страви готуються лише зі свіжих інгредієнтів — смак, який ви запам’ятаєте надовго.'
  },
  {
    title: 'Швидка доставка',
    img: adv2,
    description: 'Найшвидша доставка до ваших дверей — їжа прибуває гарячою, ніби щойно з печі.'
  },
  {
    title: 'Затишна атмосфера',
    img: adv3,
    description: 'Створюємо простір, де хочеться залишитися довше — тепло, комфорт і гарний настрій.'
  },
]

function Advantages() {
  return (
    <section className={styles.advantages}>
      <h2>Наші переваги</h2>
      <div className={styles.grid}>
        {advantages.map((adv, index) => (
          <div key={index} className={styles.card}>
            <img src={adv.img} alt={adv.title} />
            <p>{adv.title}</p>
            <small>{adv.description}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Advantages;
