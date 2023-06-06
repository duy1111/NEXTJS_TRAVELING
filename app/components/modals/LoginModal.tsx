'use client'
import React,{useState,useCallback} from 'react'
import{AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useLoginModal from '../../hooks/useLoginModal'
import {signIn} from 'next-auth/react'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'
const LoginModal = () => {
    const router = useRouter();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials',{
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                LoginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback?.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4' >
            <Heading title='Welcome back' subtitle='Login to your Account!' center />
            <Input  id="email" label='Email' disabled={isLoading} register={register} errors={errors} required />
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
                    <div onClick={LoginModal.onClose}  className='text-neutral-800 cursor-pointer hover:underline' >Log in</div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal disabled={isLoading} footer={footerContent} isOpen={LoginModal.isOpen} body={bodyContent} title='Login' actionLabel='Continue' onClose={LoginModal.onClose} onSubmit={handleSubmit(onSubmit)} />

    
  )
}

export default LoginModal