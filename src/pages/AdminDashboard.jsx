import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { usePayments } from '../context/PaymentContext'

export default function AdminDashboard() {
  const { user } = useAuth()
  const { payments, getTotalReceived } = usePayments()
  const navigate = useNavigate()

  const bgColor = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Admin Dashboard</Heading>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel>Total Payments</StatLabel>
              <StatNumber>{payments.length}</StatNumber>
              <StatHelpText>All time</StatHelpText>
            </Stat>
          </Box>

          <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel>Total Received</StatLabel>
              <StatNumber>${getTotalReceived().toFixed(2)}</StatNumber>
              <StatHelpText>USD equivalent</StatHelpText>
            </Stat>
          </Box>

          <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel>Success Rate</StatLabel>
              <StatNumber>100%</StatNumber>
              <StatHelpText>All payments successful</StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>

        {/* Payments Table */}
        <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" overflowX="auto">
          <Heading size="md" mb={4}>
            Recent Payments
          </Heading>
          
          {payments.length === 0 ? (
            <Text color="gray.500">No payments yet</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Amount</Th>
                  <Th>Currency</Th>
                  <Th>Method</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>{payment.name}</Td>
                    <Td>{payment.amount}</Td>
                    <Td>{payment.currency}</Td>
                    <Td textTransform="capitalize">{payment.method}</Td>
                    <Td>
                      <Badge colorScheme="green">{payment.status}</Badge>
                    </Td>
                    <Td>{new Date(payment.date).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
    </Container>
  )
}
