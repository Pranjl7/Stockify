import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Questions from './components/Questions';

function App() {

  return (
    <main className='relative min-h-screen max-w-6xl border-x border-black/10 mx-auto font-inter'>
      <Navbar />
      <Hero />
      <Questions />
      <Footer />
    </main>
  );
}

export default App;
