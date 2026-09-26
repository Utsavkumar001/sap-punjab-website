import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { NewsSection } from '../components/NewsSection';
import { Gallery } from '../components/Gallery';
import { SupportedBy } from '../components/SupportedBy';

export function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <NewsSection />
      <Gallery />
      <SupportedBy />
    </>
  );
}
