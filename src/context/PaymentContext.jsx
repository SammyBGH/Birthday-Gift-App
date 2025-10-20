import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const PaymentContext = createContext(null)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch payments from backend
  const fetchPayments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/payments`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setPayments(data.data)
      } else {
        console.error('Failed to fetch payments:', data.message)
        toast.error('Failed to load payments')
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
      toast.error('Failed to load payments')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const addPayment = async (payment) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Refresh payments list
        await fetchPayments()
        toast.success('Payment recorded successfully!')
        return true
      } else {
        throw new Error(data.message || 'Failed to save payment')
      }
    } catch (error) {
      console.error('Error adding payment:', error)
      toast.error(error.message || 'Failed to save payment')
      return false
    }
  }

  const getTotalReceived = () => {
    return payments
      .filter(p => p.status === 'completed')
      .reduce((total, p) => total + p.amount, 0)
  }

  return (
    <PaymentContext.Provider value={{
      payments,
      isLoading,
      addPayment,
      getTotalReceived,
      refreshPayments: fetchPayments
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayments = () => {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayments must be used within PaymentProvider')
  }
  return context
}
