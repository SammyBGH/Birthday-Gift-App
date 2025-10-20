import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

// Providers
import { AuthProvider } from './context/AuthContext'
import { PaymentProvider } from './context/PaymentContext'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'

// Pages
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import ThankYouPage from './pages/ThankYouPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <PaymentProvider>
      <AuthProvider>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <ScrollToTop />
          
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>

          <Footer />
          
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a202c',
                color: '#fff',
              },
            }}
          />
        </Box>
      </AuthProvider>
    </PaymentProvider>
  )
}

export default App
