'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  }
})
const volunteeringAdvantages = [
  {
    id: 1,
    title: "Make a Difference",
    text: "Contribute to causes you care about and positively impact your community or the world.",
  },
  {
    id: 2,
    title: "Gain New Skills",
    text: "Develop skills like communication, teamwork, problem-solving, and leadership.",
  },
  {
    id: 3,
    title: "Improve Your Health",
    text: "Reduce stress, combat depression, and increase overall well-being.",
  },
  {
    id: 4,
    title: "Expand Your Network",
    text: "Meet new people from diverse backgrounds and build lasting relationships.",
  },
  {
    id: 5,
    title: "Boost Your Career",
    text: "Enhance your resume and demonstrate your commitment to social responsibility.",
  },
  {
    id: 6,
    title: "Find Purpose and Fulfillment",
    text: "Help others to gain self-esteem and life satisfaction.",
  },
  {
    id: 7,
    title: "Strengthen Your Community",
    text: "Help build stronger, more connected communities.",
  },
  {
    id: 8,
    title: "Learn About Yourself",
    text: "Discover your passions, values, and strengths.",
  },
];

export default function Feature() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Why volunteering?</Heading>
        {/* <Text color={'gray.600'} fontSize={'xl'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </Text> */}
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {volunteeringAdvantages.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}