import { useEffect } from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { createConfetti } from '../utils/confetti'

export default function ThankYouPage() {
  useEffect(() => {
    createConfetti({ particleCount: 100, spread: 90 })
  }, [])

  return (
    <Container maxW="2xl" py={20}>
      <VStack spacing={6} textAlign="center">
        <Box color="green.500">
          <FaCheckCircle size={80} />
        </Box>
        
        <Heading size="2xl">Thank You! 🎉</Heading>
        
        <Text fontSize="xl" color="gray.600">
          Your birthday gift has been sent successfully!
        </Text>
        
        <Text color="gray.500">
          The recipient will be notified about your thoughtful gift.
        </Text>

        <VStack spacing={3} pt={6}>
          <Button as={Link} to="/" colorScheme="blue" size="lg">
            Back to Home
          </Button>
          <Button as={Link} to="/payment" variant="outline" size="lg">
            Send Another Gift
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
}
