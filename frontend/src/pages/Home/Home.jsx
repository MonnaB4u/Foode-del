import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploeMenu from '../../components/ExploeMenu/ExploeMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'


function Home() {
  const [category,setCategory]=useState("All")
  return (
    <div>
      <Header/>
      <ExploeMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
