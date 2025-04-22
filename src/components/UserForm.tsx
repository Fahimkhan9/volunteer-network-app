'use client'

import { UserContext } from '@/context/context';
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
  FormErrorMessage,
} from '@chakra-ui/react'
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { useForm, SubmitHandler } from "react-hook-form"
export default function UserForm({islogin}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors,isSubmitting },
      } = useForm()
      const router=useRouter()
      const {user,setUser}=useContext(UserContext)
     
      
      const handlelogin=async(values)=>{
        try {
            const user={
                email:values.email,
                password:values.password
            }
         const res=await axios.post('/api/users/login',user)
         console.log(res.data);
         
         router.push('/profile')
         
         
        } catch (error) {
          console.log(error);
          
        }
    
      }
      const handlesignup=async(values)=>{
          try {
            const user={
                username:values.username,
                email:values.email,
                password:values.password
            }
           const res=await axios.post('/api/users/signup',user)
           console.log(res);
           router.push('/login')
           
          } catch (error) {
            console.log(error);
            
          }
      
        }
      const onSubmit = (values) => {
        if(islogin){
            handlelogin(values)
        }else{
            handlesignup(values)
        }

      }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          {
            islogin ? <Heading fontSize={'4xl'}>Sign in to your account</Heading>:<Heading fontSize={'4xl'}>Sign up to your account</Heading>
          }
          
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit(onSubmit)} >
          <Stack spacing={4}>
          {
            !islogin && <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input type="username"  
            {...register('username', {
          required: 'This is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })} 
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
          </FormControl>
          }
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor='email'>Email address</FormLabel>
              <Input type="email"  
              {...register('email', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
          })} 
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input type="text"
               {...register('password', {
                required: 'This is required',
                minLength: { value: 6, message: 'Minimum length should be 6' },
              })} 
              />
              <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                {
                  islogin ? <Text color={'blue.400'}>
                    <Link href='/signup'>New user?Sign up now!</Link>
                    
                    </Text>:<Text color={'blue.400'}>
                      <Link href='/login'>Already a user?Go to Login</Link>
                      
                      </Text>
                }
                
              </Stack>
              {
                islogin ? <Button
                isLoading={isSubmitting}
                type='submit'
                isDisabled={isSubmitting}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button> :  <Button
                isLoading={isSubmitting}
                type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              }
             
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}