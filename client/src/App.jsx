import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NewsletterModal from './components/NewsletterModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main className='py-8 min-h-screen bg-[#fdfaf5]'>
                <div className='container mx-auto px-4'>
                    <Outlet />
                </div>
            </main>
            <Footer />
            <NewsletterModal />
            <ToastContainer />
        </>
    );
};

export default App;
