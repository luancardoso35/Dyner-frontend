'use client'

import Button from "@/components/AuthPages/Button"
import Error from "@/components/AuthPages/Error"
import Input from "@/components/AuthPages/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const forgotPasswordSchema = z.object({
    email: z.string().min(1, {message: 'Preencha todos os campos.'}).email({message: 'Email inválido.'}),
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export default function ForgotPasswordPage() {
    const { register, handleSubmit, formState: {errors}, clearErrors} = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema)
    })

    function changePassword(data: ForgotPasswordSchema) {
        console.log(data)
    }
    return (
        <div className="flex">
            <Link href='/sign-in'><h1 className="absolute text-white xxs:text-3xl xs:text-4xl cursor-pointer ml-[5%] md:ml-[10%] lg:ml-[50%] 2xl:ml-[1100px] top-[2vh]">&larr;</h1></Link>
            <div className="hidden lg:flex lg:w-2/5 2xl:w-1/2  items-center justify-center">
                <div className="xl:bg-center 2xl:bg-center w-full bg-no-repeat bg-[url('/images/forgot-password-page/honest-letter-about-life-self-love-and-feeling-lost.jpeg')] h-screen bg-[length:auto_100%] hidden lg:block"></div>
            </div>
            <div className='lg:w-3/5 2xl:w-1/2 w-full  sm:ml-0 h-[100vh] text-center px-8 sm:px-16 md:px-32 xl:px-32 py-24 xxs:py-[5vh] xs:py-12 s:py-24 sm:py-16 md:py-24 lg:py-8 xl:py-16'>
                <h1 className='text-gray-200 text-3xl xxs:text-2xl s:text-4xl font-bold mt-24 lg:mt-60'>Esqueci a senha</h1>
                <p className='text-gray-400 text-base md:text-2xl  mt-4 font-bold'>Nos informe seu email e enviaremos para alterar sua senha.</p>

                <div className="sm:max-w-[70%] md:max-w-[70%] lg:max-w-[100%] xl:max-w-[60%] m-auto">
                    <form className="xs:mt-12 xxs:mt-4 s:mt-6 text-left xxs:mb-6 xs:mb-16" onSubmit={handleSubmit(changePassword)}>
                        <Input register={register} type="text" label="Email" registerName="email" setError={() => clearErrors('email')} />                    
                        {
                            errors
                            &&
                            <Error>{errors.email?.message}</Error>
                        }
                        <Button errors={errors.email?.message ? true:false}>Enviar email&ensp;&rarr;</Button>
                    </form>
                </div>
            </div>
            </div>

    )
}