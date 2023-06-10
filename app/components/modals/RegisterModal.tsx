'use client'
import React,{useState,useCallback} from 'react'
import axios from 'axios'
import{AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import {signIn} from 'next-auth/react'
import Button from '../Button'
import LoginModal from './LoginModal'
import useLoginModal from '@/app/hooks/useLoginModal'
const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register',data)
            .then(() => {
                toast.success('Success!')
                registerModal.onClose()
                loginModal.onOpen()
            }).catch((error) => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4' >
            <Heading title='Welcome to Airbnb' subtitle='Create an Account!' center />
            <Input  id="email" label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input  id="name" label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input  id="password" label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3' >
            <hr/>
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {}} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className='text-neutral-500 text-center mt-4 font-light justify-center' >
                <div className='flex items-center gap-2' >
                    <div>Already have an account?</div>
                    <div onClick={registerModal.onClose}  className='text-neutral-800 cursor-pointer hover:underline' >Log in</div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal disabled={isLoading} footer={footerContent} isOpen={registerModal.isOpen} body={bodyContent} title='Register' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} />

    
  )
}

export default RegisterModal