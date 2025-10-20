import { Box, Button, Container, Heading, Text, VStack, SimpleGrid, Icon, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaGift, FaRocket, FaHeart, FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const features = [
  {
    icon: FaGift,
    title: 'Easy Gifting',
    description: 'Send birthday gifts with just a few clicks'
  },
  {
    icon: FaRocket,
    title: 'Fast & Secure',
    description: 'Lightning-fast payments with top-notch security'
  },
  {
    icon: FaHeart,
    title: 'Personal Touch',
    description: 'Add personalized messages to your gifts'
  },
  {
    icon: FaShieldAlt,
    title: 'Safe Payments',
    description: 'Your payment information is always protected'
  },
]

export default function HomePage() {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, pink.50)',
    'linear(to-br, gray.900, gray.800)'
  )

  return (
    <Box>
      {/* Hero Section */}
      <Box bgGradient={bgGradient} py={20}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading
                as="h1"
                size="3xl"
                bgGradient="linear(to-r, blue.400, pink.400)"
                bgClip="text"
                mb={4}
              >
                Make Birthdays Special
              </Heading>
              <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
                Send birthday gifts and payments instantly to your loved ones.
                Simple, fast, and secure.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                as={Link}
                to="/payment"
                size="lg"
                colorScheme="blue"
                px={8}
                py={6}
                fontSize="lg"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                transition="all 0.2s"
              >
                🎁 Send a Gift Now
              </Button>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="7xl" py={20}>
        <Heading textAlign="center" mb={12}>
          Why Choose Us?
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {features.map((feature, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VStack
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="xl"
                boxShadow="md"
                spacing={4}
                _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
                transition="all 0.3s"
              >
                <Icon as={feature.icon} boxSize={12} color="blue.500" />
                <Heading size="md">{feature.title}</Heading>
                <Text textAlign="center" color="gray.500">
                  {feature.description}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box bg={useColorModeValue('blue.50', 'gray.800')} py={16}>
        <Container maxW="4xl" textAlign="center">
          <Heading mb={4}>Ready to Send a Gift?</Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Make someone's birthday unforgettable today!
          </Text>
          <Button
            as={Link}
            to="/payment"
            size="lg"
            colorScheme="pink"
            px={8}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
