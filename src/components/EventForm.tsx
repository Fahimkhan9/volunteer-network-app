'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Textarea,
    FormErrorMessage,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { useForm, SubmitHandler } from "react-hook-form"
export default function EventForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()
    const router=useRouter()
    const getuser=async ()=>{
        const res=await axios.get('/api/users/me')
        console.log(res.data);
        return res.data.data
    }
    const onSubmit = async (values) => {
        try {
            // console.log(values)
            const user=await getuser()
            
            
            // const data={
            //     title:values.title,
            //     description:values.description,
            //     location:values.location,
            //     date:values.date,
            //     time:values.time,
                // ownerId:user._id,
                // owneremail:user.email,
                
            // }
            const formData=new FormData()
            formData.append('title',values.title)
            formData.append('description',values.description)
            formData.append('location',values.location)
            formData.append('date',values.date)
            formData.append('time',values.time)
            formData.append('image',values.image[0])
            formData.append('owneremail',user.email)
            formData.append('ownerId',user._id)




            // console.log(data);
            const res=await axios.post('/api/events/create',formData)
            console.log(res);
            router.push('/events')
            
        } catch (error) {
            console.log(error);
            
        }

    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'4xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Create an EVENT!</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Stack spacing={4}>
                            <FormControl isInvalid={errors.title} >
                                <FormLabel htmlFor='title'>Title</FormLabel>
                                <Input type="text"
                                    {...register('title', {
                                        required: 'This is required',
                                        minLength: { value: 4, message: 'Minimum length should be 4' },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.title && errors.title.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.description}>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea
                                    {...register('description', {
                                        required: 'This is required',
                                        minLength: { value: 4, message: 'Minimum length should be 4' },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.description && errors.description.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.location} >
                                <FormLabel htmlFor='location'>Location</FormLabel>
                                <Input type="text"
                                    {...register('location', {
                                        required: 'This is required',

                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.location && errors.location.message}
                                </FormErrorMessage>
                            </FormControl>
                            
                            <FormControl isInvalid={errors.date}>
                                <FormLabel htmlFor='date'>Date</FormLabel>
                                <Input type="date"
                                    {...register('date', {
                                        required: 'This is required',

                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.date && errors.date.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.time}>
                                <FormLabel htmlFor='time'>Time</FormLabel>
                                <Input type="time"
                                    {...register('time', {
                                        required: 'This is required',

                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.time && errors.time.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.image} >
                                <FormLabel htmlFor='image'>Event Thumbnail Image</FormLabel>
                                <Input type="file"
                                    {...register('image', {
                                        required: 'This is required',

                                    })}
                                    accept="image/png, image/jpeg"
                                />
                                <FormErrorMessage>
                                    {errors.image && errors.image.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>

                                <Button
                                    isLoading={isSubmitting}
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Create
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}