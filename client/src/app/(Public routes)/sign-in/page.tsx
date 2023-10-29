'use client'

import API from 'api'
import { useForm } from 'react-hook-form'

type FormState = {
    email: string
    password: string
}

const Page = () => {
    const { register, handleSubmit } = useForm<FormState>()

    const onSubmit = async (data: FormState) => {
        const response = await API.post('auth', data)
        console.log(response.data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='m-auto mt-24 flex w-[500px] flex-col items-center rounded-lg bg-primary'
        >
            <h1 className='mt-10 text-3xl font-bold'>Welcome back!</h1>
            <input
                {...register('email')}
                type='text'
                className='mt-8 w-80 border-b-2 border-slate-500 bg-transparent px-4 py-2 text-xl font-semibold'
                placeholder='Email'
            />
            <input
                {...register('password')}
                type='password'
                className='mt-6 w-80 border-b-2 border-slate-500 bg-transparent px-4 py-2 text-xl font-semibold'
                placeholder='Password'
            />
            <button
                type='submit'
                className='my-12 rounded bg-green-600 px-8 py-1 font-semibold duration-200 hover:bg-opacity-90'
            >
                Login
            </button>
        </form>
    )
}
export default Page
