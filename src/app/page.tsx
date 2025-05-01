import React from 'react';
import Header from '../components/Header';  // This is the default import
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import BuddyMatchSection from '../components/BuddyMatchSection';
import ChallengeArena from '../components/ChallengeArena';
import QuickWins from '../components/QuickWins';
import Testimonials from '../components/Testimonials';
import GoogleMapsLoader from '../components/GoogleMapsLoader';
//import firebase from '../lib/firebase';
//import firebase from '../lib/firebase';
import Map from '../components/Map';
export default function page() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeatureSection />
      <BuddyMatchSection />
      <ChallengeArena />
      <QuickWins />
      <Testimonials />
      <GoogleMapsLoader />
      <Map />
      
    </>
  );
}
