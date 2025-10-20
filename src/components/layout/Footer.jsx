import { Box, Container, Flex, Text, Link, useColorModeValue } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'

export default function Footer() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      py={8}
      mt="auto"
    >
      <Container maxW="7xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} Birthday Gifts. All rights reserved.
          </Text>
          
          <Flex align="center" gap={1} fontSize="sm" color="gray.500">
            <Text>Made with</Text>
            <FaHeart color="#ec4899" size={14} />
            <Text>for birthdays</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
