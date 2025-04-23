'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import heroimg from '@/helpers/file.svg'
import Image from 'next/image'
export default function Hero() {
  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'purple',
                zIndex: -1,
              }}>
              Experience the joy of HELPING.
            </Text>
            
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dicta rerum animi. Omnis sapiente fugiat ratione, necessitatibus explicabo esse perspiciatis expedita sint dicta similique, doloribus voluptatem facere assumenda? Aut repellat sed iure quod rerum at illo vero corrupti distinctio maxime debitis, fugiat ut veniam quibusdam reiciendis cumque aperiam reprehenderit laborum.
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
            <Link
            href='/events'
            >
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'purple'}
              bg={'purple'}
              // _hover={{ bg: 'purple.700' }}
              >
                Events
            </Button>
            </Link>
            
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Image
          src={heroimg}
          alt="hero image"
          width={500}
          height={500}
          />
        </Flex>
      </Stack>
    </Container>
  )
}

