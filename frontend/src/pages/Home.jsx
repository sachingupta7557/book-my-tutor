import React from 'react'
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopTutors from '../components/TopTutors';
import Banner from '../components/Banner';

export const Home = () => {
  return (
    <div>

      <Header/>
      <SpecialityMenu/>
      <TopTutors/>
      <Banner/>

    </div>
  )
}

export default Home;
