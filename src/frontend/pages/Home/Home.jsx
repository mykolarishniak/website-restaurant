import React from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Categories from '../../components/Categories/Categories'
import Advantages from '../../components/Advantages/Advantages'
import Footer from '../../components/Footer/Footer'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <Categories />
      <Advantages />
      <Footer />
    </div>
  )
}

export default Home
