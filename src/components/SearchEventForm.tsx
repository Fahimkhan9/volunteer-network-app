'use client'


import {
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    Text,
    Container,
    Flex,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import { useForm, SubmitHandler } from "react-hook-form"
import { error } from 'console'
import axios from 'axios'
export default function SearchEventForm({setEvents}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()
  async  function onSubmit(values){
        console.log(values);
        try {
            const data{
                title:values.search
            }
            const res=await axios.post('/api/events/search',data)
            console.log(res.data.data);
            setEvents(res.data.data)
        } catch (error) {
            
        }
    }
    return (

        <Container
            maxW={'lg'}
            bg={useColorModeValue('white', 'whiteAlpha.100')}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}>
            <Heading
                as={'h2'}
                fontSize={{ base: 'xl', sm: '2xl' }}
                textAlign={'center'}
                mb={5}>
                Search For an Event!
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={'12px'}

            >
                <FormControl isInvalid={errors.search}>
                    <FormLabel htmlFor='search'></FormLabel>
                    <Input
                        variant={'solid'}
                        borderWidth={1}
                        color={'gray.800'}
                        _placeholder={{
                            color: 'gray.400',
                        }}
                        borderColor={useColorModeValue('gray.300', 'gray.700')}
                        placeholder='Search..'
                        type='text'
                        {...register('search', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.search && errors.search.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl w={{ base: '100%', md: '40%' }}>
                    <Button
                        type='submit'
                        colorScheme='purple'
                    >
                        Search
                    </Button>
                </FormControl>
            </Stack>
            </form>
        </Container>

    )
}