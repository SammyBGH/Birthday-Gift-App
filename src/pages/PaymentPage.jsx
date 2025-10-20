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
  Textarea,
  VStack,
  HStack,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Icon,
  Text,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useClipboard,
  useToast,
  Spinner,
  Flex,
  Divider,
  IconButton,
  Tooltip,
  Code,
} from '@chakra-ui/react'
import { FaMobileAlt, FaUniversity, FaBitcoin, FaArrowLeft, FaCopy, FaCheckCircle } from 'react-icons/fa'
import { SiBinance } from 'react-icons/si'
import toast from 'react-hot-toast'
import { usePayments } from '../context/PaymentContext'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Supported cryptocurrencies
const cryptoOptions = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'SOL', name: 'Solana', icon: 'SOL' },
  { symbol: 'USDT_TRC20', name: 'Tether (TRC-20)', icon: '₮' },
]

// Wallet addresses from environment variables - organized by exchange
const getWalletAddress = (exchange, coinSymbol) => {
  const exchangeSuffix = exchange.toUpperCase()
  
  const walletConfig = {
    BTC: {
      address: import.meta.env[`VITE_BTC_ADDRESS_${exchangeSuffix}`] || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: import.meta.env.VITE_BTC_NETWORK || 'Bitcoin Network'
    },
    ETH: {
      address: import.meta.env[`VITE_ETH_ADDRESS_${exchangeSuffix}`] || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      network: import.meta.env.VITE_ETH_NETWORK || 'Ethereum (ERC-20)'
    },
    SOL: {
      address: import.meta.env[`VITE_SOL_ADDRESS_${exchangeSuffix}`] || 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
      network: import.meta.env.VITE_SOL_NETWORK || 'Solana Network'
    },
    USDT_TRC20: {
      address: import.meta.env[`VITE_USDT_ADDRESS_${exchangeSuffix}`] || 'TYourTronAddressHere123456789',
      network: import.meta.env.VITE_USDT_NETWORK || 'Tron (TRC-20)',
      token: import.meta.env.VITE_USDT_TOKEN || 'USDT'
    },
  }
  
  return walletConfig[coinSymbol] || null
}

export default function PaymentPage() {
  const navigate = useNavigate()
  const { addPayment } = usePayments()
  const [step, setStep] = useState(1) // 1: Info, 2: Payment Method, 3: Crypto Exchange, 4: Coin Selection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [cryptoExchange, setCryptoExchange] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBg = useColorModeValue('blue.50', 'blue.900')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        toast.error('Please fill in all required fields')
        return
      }
    }
    setStep(step + 1)
  }

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method)
    if (method === 'momo' || method === 'bank') {
      // Show amount input step before Paystack
      setStep(5) // New step for amount input
    } else if (method === 'crypto') {
      setStep(3) // Go to exchange selection
    }
  }

  const handleExchangeSelect = (exchange) => {
    setCryptoExchange(exchange)
    setStep(4) // Go to coin selection
  }

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin)
    onOpen() // Show wallet address modal
  }

  const handlePaystackPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    
    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      toast.error('Payment system not loaded. Please refresh the page.')
      setIsLoading(false)
      return
    }

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

    if (!paystackKey || paystackKey === 'pk_test_xxxxxxxxxxxxxxxxxxxxxx') {
      toast.error('Payment configuration error. Please contact support.')
      setIsLoading(false)
      return
    }

    try {
      const amountInPesewas = parseFloat(amount) * 100 // Convert GHS to pesewas
      
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: formData.email,
        amount: amountInPesewas, // Amount in pesewas (GHS * 100)
        currency: 'GHS',
        ref: 'BG_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
          custom_fields: [
            {
              display_name: 'Name',
              variable_name: 'name',
              value: formData.name
            },
            {
              display_name: 'Payment Method',
              variable_name: 'method',
              value: 'Mobile Money'
            },
            {
              display_name: 'Message',
              variable_name: 'message',
              value: formData.message || 'No message'
            }
          ]
        },
        channels: ['mobile_money'],
        onClose: function() {
          setIsLoading(false)
          toast.error('Payment cancelled')
        },
        callback: function(response) {
          // Payment successful
          addPayment({
            name: formData.name,
            amount: parseFloat(amount),
            currency: 'GHS',
            method: 'Mobile Money',
            message: formData.message,
            reference: response.reference,
          })

          toast.success('Payment successful!')
          setIsLoading(false)
          navigate('/thank-you')
        }
      })

      handler.openIframe()
    } catch (error) {
      console.error('Paystack error:', error)
      toast.error('Payment failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleCryptoPaymentComplete = () => {
    // Clean up symbol for display (remove network suffix)
    const displaySymbol = selectedCoin.symbol.includes('_') 
      ? selectedCoin.symbol.split('_')[0] 
      : selectedCoin.symbol

    addPayment({
      name: formData.name,
      amount: parseFloat(amount) || 0,
      currency: displaySymbol,
      method: `Crypto (${cryptoExchange})`,
      message: formData.message,
    })
    onClose()
    toast.success('Payment details saved! Please complete the transfer.')
    navigate('/thank-you')
  }

  return (
    <Container maxW="4xl" py={12} position="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.700"
          zIndex="9999"
          align="center"
          justify="center"
          backdropFilter="blur(4px)"
        >
          <VStack spacing={4}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text color="white" fontSize="lg" fontWeight="medium">
              Loading payment gateway...
            </Text>
          </VStack>
        </Flex>
      )}

      <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="xl">
        {/* Progress Indicator */}
        <HStack justify="center" mb={8} spacing={4}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Box
              key={s}
              w={step >= s ? '40px' : '12px'}
              h="12px"
              borderRadius="full"
              bg={step >= s ? 'blue.500' : 'gray.300'}
              transition="all 0.3s"
            />
          ))}
        </HStack>

        {/* Step 1: User Information */}
        {step === 1 && (
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Heading mb={6} textAlign="center">
              🎁 Send a Birthday Gift
            </Heading>

            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Your Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Birthday Message (Optional)</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a birthday message..."
                  rows={4}
                />
              </FormControl>

              <Button
                onClick={handleNextStep}
                colorScheme="blue"
                size="lg"
                width="full"
                mt={4}
              >
                Continue to Payment
              </Button>
            </VStack>
          </MotionBox>
        )}

        {/* Step 2: Payment Method Selection */}
        {step === 2 && (
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <HStack mb={6}>
              <IconButton
                icon={<FaArrowLeft />}
                onClick={() => setStep(1)}
                variant="ghost"
                aria-label="Go back"
              />
              <Heading size="lg">Choose Payment Method</Heading>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {/* Mobile Money */}
              <Box
                as="button"
                p={8}
                borderWidth="2px"
                borderColor={borderColor}
                borderRadius="xl"
                _hover={{ borderColor: 'blue.500', bg: hoverBg, transform: 'translateY(-4px)' }}
                transition="all 0.3s"
                onClick={() => handlePaymentMethodSelect('momo')}
              >
                <VStack spacing={4}>
                  <Icon as={FaMobileAlt} boxSize={12} color="blue.500" />
                  <Heading size="md">Mobile Money</Heading>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Pay via MTN, Vodafone, AirtelTigo & Bank Transfer
                  </Text>
                  <Badge colorScheme="green">Paystack</Badge>
                </VStack>
              </Box>

              {/* Cryptocurrency */}
              <Box
                as="button"
                p={8}
                borderWidth="2px"
                borderColor={borderColor}
                borderRadius="xl"
                _hover={{ borderColor: 'orange.500', bg: hoverBg, transform: 'translateY(-4px)' }}
                transition="all 0.3s"
                onClick={() => handlePaymentMethodSelect('crypto')}
              >
                <VStack spacing={4}>
                  <Icon as={FaBitcoin} boxSize={12} color="orange.500" />
                  <Heading size="md">Cryptocurrency</Heading>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Pay with crypto
                  </Text>
                  <Badge colorScheme="orange">Binance / OKX</Badge>
                </VStack>
              </Box>
            </SimpleGrid>
          </MotionBox>
        )}

        {/* Step 3: Crypto Exchange Selection */}
        {step === 3 && (
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <HStack mb={6}>
              <IconButton
                icon={<FaArrowLeft />}
                onClick={() => setStep(2)}
                variant="ghost"
                aria-label="Go back"
              />
              <Heading size="lg">Select Exchange</Heading>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Binance */}
              <Box
                as="button"
                p={10}
                borderWidth="2px"
                borderColor={borderColor}
                borderRadius="xl"
                _hover={{ borderColor: 'yellow.500', bg: hoverBg, transform: 'translateY(-4px)' }}
                transition="all 0.3s"
                onClick={() => handleExchangeSelect('Binance')}
              >
                <VStack spacing={4}>
                  <Icon as={SiBinance} boxSize={16} color="yellow.500" />
                  <Heading size="lg">Binance</Heading>
                  <Text fontSize="sm" color="gray.500">
                    World's largest crypto exchange
                  </Text>
                </VStack>
              </Box>

              {/* OKX */}
              <Box
                as="button"
                p={10}
                borderWidth="2px"
                borderColor={borderColor}
                borderRadius="xl"
                _hover={{ borderColor: 'blue.500', bg: hoverBg, transform: 'translateY(-4px)' }}
                transition="all 0.3s"
                onClick={() => handleExchangeSelect('OKX')}
              >
                <VStack spacing={4}>
                  <Text fontSize="6xl" fontWeight="bold">OKX</Text>
                  <Heading size="lg">OKX</Heading>
                  <Text fontSize="sm" color="gray.500">
                    Leading crypto trading platform
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </MotionBox>
        )}

        {/* Step 4: Coin Selection */}
        {step === 4 && (
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <HStack mb={6}>
              <IconButton
                icon={<FaArrowLeft />}
                onClick={() => setStep(3)}
                variant="ghost"
                aria-label="Go back"
              />
              <Heading size="lg">Select Cryptocurrency</Heading>
            </HStack>

            <Text mb={6} color="gray.500" textAlign="center">
              Choose your preferred cryptocurrency
            </Text>

            <SimpleGrid columns={{ base: 2, md: 2 }} spacing={6}>
              {cryptoOptions.map((coin) => (
                <Box
                  key={coin.symbol}
                  as="button"
                  p={6}
                  borderWidth="2px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  _hover={{ borderColor: 'blue.500', bg: hoverBg, transform: 'scale(1.05)' }}
                  transition="all 0.3s"
                  onClick={() => handleCoinSelect(coin)}
                >
                  <VStack spacing={2}>
                    <Text fontSize="3xl">{coin.icon}</Text>
                    <Text fontWeight="bold">{coin.symbol}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {coin.name}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </MotionBox>
        )}

        {/* Step 5: Amount Input for Paystack */}
        {step === 5 && (
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <HStack mb={6}>
              <IconButton
                icon={<FaArrowLeft />}
                onClick={() => setStep(2)}
                variant="ghost"
                aria-label="Go back"
              />
              <Heading size="lg">Enter Amount</Heading>
            </HStack>

            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel fontSize="lg">Amount (GHS)</FormLabel>
                <NumberInput min={1} size="lg">
                  <NumberInputField
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in Cedis"
                    fontSize="2xl"
                    h="60px"
                  />
                </NumberInput>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Payment via Mobile Money (MTN, Vodafone, AirtelTigo & Bank Transfer)
                </Text>
              </FormControl>

              <Button
                onClick={handlePaystackPayment}
                colorScheme="green"
                size="lg"
                width="full"
                isLoading={isLoading}
                loadingText="Processing..."
                leftIcon={<FaMobileAlt />}
              >
                Pay GHS {amount || '0.00'}
              </Button>
            </VStack>
          </MotionBox>
        )}
      </Box>

      {/* Wallet Address Modal */}
      <WalletAddressModal
        isOpen={isOpen}
        onClose={onClose}
        coin={selectedCoin}
        walletInfo={selectedCoin && cryptoExchange ? getWalletAddress(cryptoExchange, selectedCoin.symbol) : null}
        amount={amount}
        exchange={cryptoExchange}
        onComplete={handleCryptoPaymentComplete}
      />
    </Container>
  )
}

// Wallet Address Modal Component
function WalletAddressModal({ isOpen, onClose, coin, walletInfo, amount, exchange, onComplete }) {
  const { hasCopied: addressCopied, onCopy: onCopyAddress } = useClipboard(walletInfo?.address || '')
  const { hasCopied: tagCopied, onCopy: onCopyTag } = useClipboard(walletInfo?.tag || '')
  const bgColor = useColorModeValue('white', 'gray.800')

  if (!coin || !walletInfo) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <HStack justify="space-between">
            <HStack>
              <Text fontSize="2xl">{coin.icon}</Text>
              <VStack align="start" spacing={0}>
                <Text>Send {coin.symbol.split('_')[0]}</Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.500">
                  {coin.name}
                </Text>
              </VStack>
            </HStack>
            <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
              {exchange}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Amount */}
            <Box p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg">
              <Text fontSize="sm" color="gray.500" mb={1}>
                Amount to Send
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                ${amount} USD
              </Text>
              <Text fontSize="sm" color="gray.500">
                ≈ {(parseFloat(amount) / 50000).toFixed(6)} {coin.symbol}
              </Text>
            </Box>

            <Divider />

            {/* Network */}
            <Box>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Network
              </Text>
              <Badge colorScheme="purple" fontSize="md" p={2}>
                {walletInfo.network}
              </Badge>
            </Box>

            {/* Wallet Address */}
            <Box>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Wallet Address
              </Text>
              <HStack>
                <Code
                  p={3}
                  borderRadius="md"
                  fontSize="sm"
                  wordBreak="break-all"
                  flex="1"
                >
                  {walletInfo.address}
                </Code>
                <Tooltip label={addressCopied ? 'Copied!' : 'Copy address'}>
                  <IconButton
                    icon={addressCopied ? <FaCheckCircle /> : <FaCopy />}
                    onClick={onCopyAddress}
                    colorScheme={addressCopied ? 'green' : 'blue'}
                    aria-label="Copy address"
                  />
                </Tooltip>
              </HStack>
            </Box>

            {/* Token (if applicable) */}
            {walletInfo.token && (
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Token Contract
                </Text>
                <Badge colorScheme="orange" fontSize="sm" p={2}>
                  {walletInfo.token}
                </Badge>
              </Box>
            )}

            {/* Memo/Tag (if applicable) */}
            {walletInfo.tag && (
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Memo/Tag (Required)
                </Text>
                <HStack>
                  <Code p={3} borderRadius="md" fontSize="md" flex="1">
                    {walletInfo.tag}
                  </Code>
                  <Tooltip label={tagCopied ? 'Copied!' : 'Copy tag'}>
                    <IconButton
                      icon={tagCopied ? <FaCheckCircle /> : <FaCopy />}
                      onClick={onCopyTag}
                      colorScheme={tagCopied ? 'green' : 'blue'}
                      aria-label="Copy tag"
                    />
                  </Tooltip>
                </HStack>
              </Box>
            )}

            {/* Instructions */}
            <Box p={4} bg={useColorModeValue('yellow.50', 'yellow.900')} borderRadius="lg">
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                ⚠️ Important Instructions
              </Text>
              <VStack align="start" spacing={1} fontSize="sm">
                <Text>• Send only {coin.symbol} to this address</Text>
                <Text>• Use {walletInfo.network} network</Text>
                {walletInfo.tag && <Text>• Include the memo/tag in your transfer</Text>}
                <Text>• Minimum amount: $10 USD</Text>
                <Text>• Transaction may take 5-30 minutes</Text>
              </VStack>
            </Box>

            {/* Confirm Button */}
            <Button
              colorScheme="green"
              size="lg"
              onClick={onComplete}
              leftIcon={<FaCheckCircle />}
            >
              I've Sent the Payment
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
