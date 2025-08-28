import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import WorkWithUs from '../components/WorkWithUs';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <HowItWorks />
      <WorkWithUs />
      <ContactForm />
      <Footer />
    </>
  );
}
