import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import FactoringCalculator from '../components/FactoringCalculator';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Offices from '../components/Offices';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <HowItWorks />
      <FactoringCalculator />
      <Offices />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
