import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'
import { FaLock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const bgColor = useColorModeValue('white', 'gray.800')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(email, password)
    
    if (success) {
      navigate('/admin')
    }
    
    setIsLoading(false)
  }

  return (
    <Container maxW="md" py={20}>
      <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="xl">
        <VStack spacing={6}>
          <Box color="blue.500">
            <FaLock size={48} />
          </Box>
          
          <Heading>Admin Login</Heading>
          
          <Text color="gray.500" textAlign="center">
            Sign in to access the admin dashboard
          </Text>

          <Box as="form" onSubmit={handleSubmit} width="full">
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                size="lg"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </VStack>
          </Box>

          <Text fontSize="sm" color="gray.500">
            Demo credentials: admin@example.com / admin123
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}
