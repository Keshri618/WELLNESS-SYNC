import React from 'react';
import Header from '../components/Header';  // This is the default import
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import BuddyMatchSection from '../components/BuddyMatchSection';
import ChallengeArena from '../components/ChallengeArena';
import QuickWins from '../components/QuickWins';
import Testimonials from '../components/Testimonials';
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
    </>
  );
}
