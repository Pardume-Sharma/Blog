import { useState } from 'react'
import './Home.css'
import Hero from '../../components/Hero/Hero'
import Feedback from '../../components/Feedback/Feedback'
// import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
// import Footer from '../../components/Footer/Footer'
// import BlogDisplay from '../../components/BlogDisplay/BlogDisplay'

const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <>
    <Hero />
    {/* <BlogDisplay />    */}
    {/* <ExploreMenu   category={category} setcategory={setcategory} /> */}
    <Feedback/>
    </>
  )
}

export default Home