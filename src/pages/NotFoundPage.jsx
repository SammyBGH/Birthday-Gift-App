import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Container maxW="2xl" py={20}>
      <VStack spacing={6} textAlign="center">
        <Heading size="4xl" color="blue.500">
          404
        </Heading>
        
        <Heading size="xl">Page Not Found</Heading>
        
        <Text fontSize="lg" color="gray.600">
          Oops! The page you're looking for doesn't exist.
        </Text>

        <Button as={Link} to="/" colorScheme="blue" size="lg" mt={4}>
          Go Back Home
        </Button>
      </VStack>
    </Container>
  )
}
