import { useState } from 'react'
import { 
  Box, 
  Flex, 
  Button, 
  IconButton, 
  useColorMode, 
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { FaBirthdayCake } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, logout } = useAuth()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Flex alignItems="center" gap={2}>
          <FaBirthdayCake size={24} color="#3b82f6" />
          <Box
            as={Link}
            to="/"
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, pink.400)"
            bgClip="text"
          >
            <Text display={{ base: 'none', sm: 'block' }}>Birthday Gifts</Text>
            <Text display={{ base: 'block', sm: 'none' }}>BG</Text>
          </Box>
        </Flex>

        {/* Desktop Navigation */}
        <Flex alignItems="center" gap={2} display={{ base: 'none', md: 'flex' }}>
          <Button
            as={Link}
            to="/"
            variant={location.pathname === '/' ? 'solid' : 'ghost'}
            colorScheme={location.pathname === '/' ? 'blue' : 'gray'}
            size="sm"
          >
            Home
          </Button>
          
          <Button
            as={Link}
            to="/payment"
            variant={location.pathname === '/payment' ? 'solid' : 'ghost'}
            colorScheme={location.pathname === '/payment' ? 'blue' : 'gray'}
            size="sm"
          >
            Send Gift
          </Button>

          {user && (
            <Button
              as={Link}
              to="/admin"
              variant={location.pathname === '/admin' ? 'solid' : 'ghost'}
              colorScheme={location.pathname === '/admin' ? 'blue' : 'gray'}
              size="sm"
            >
              Dashboard
            </Button>
          )}

          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
            aria-label="Toggle color mode"
          />

          {user ? (
            <Button onClick={logout} colorScheme="red" variant="outline" size="sm">
              Logout
            </Button>
          ) : (
            <Button as={Link} to="/admin/login" colorScheme="blue" size="sm">
              Admin Login
            </Button>
          )}
        </Flex>

        {/* Mobile Menu Button */}
        <Flex alignItems="center" gap={2} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
            aria-label="Toggle color mode"
          />
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            size="md"
            aria-label="Open menu"
          />
        </Flex>
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Flex alignItems="center" gap={2}>
              <FaBirthdayCake size={20} color="#3b82f6" />
              <Text
                fontSize="lg"
                fontWeight="bold"
                bgGradient="linear(to-r, blue.400, pink.400)"
                bgClip="text"
              >
                Birthday Gifts
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <Button
                as={Link}
                to="/"
                onClick={onClose}
                variant={location.pathname === '/' ? 'solid' : 'ghost'}
                colorScheme={location.pathname === '/' ? 'blue' : 'gray'}
                justifyContent="flex-start"
                size="lg"
              >
                Home
              </Button>
              
              <Button
                as={Link}
                to="/payment"
                onClick={onClose}
                variant={location.pathname === '/payment' ? 'solid' : 'ghost'}
                colorScheme={location.pathname === '/payment' ? 'blue' : 'gray'}
                justifyContent="flex-start"
                size="lg"
              >
                Send Gift
              </Button>

              {user && (
                <Button
                  as={Link}
                  to="/admin"
                  onClick={onClose}
                  variant={location.pathname === '/admin' ? 'solid' : 'ghost'}
                  colorScheme={location.pathname === '/admin' ? 'blue' : 'gray'}
                  justifyContent="flex-start"
                  size="lg"
                >
                  Dashboard
                </Button>
              )}

              <Box borderTopWidth="1px" borderColor={borderColor} pt={4} mt={4}>
                {user ? (
                  <Button 
                    onClick={() => {
                      logout()
                      onClose()
                    }} 
                    colorScheme="red" 
                    variant="outline" 
                    size="lg"
                    width="full"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button 
                    as={Link} 
                    to="/admin/login" 
                    onClick={onClose}
                    colorScheme="blue" 
                    size="lg"
                    width="full"
                  >
                    Admin Login
                  </Button>
                )}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
