import { Box, Spinner, Text, VStack } from '@chakra-ui/react'

export default function LoadingScreen() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.700"
          color="blue.500"
          size="xl"
        />
        <Text color="gray.400" fontSize="lg">
          Loading...
        </Text>
      </VStack>
    </Box>
  )
}
