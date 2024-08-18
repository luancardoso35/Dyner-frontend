'use client'

import Button from "@/components/AuthPages/Button"
import Error from "@/components/AuthPages/Error"
import Input from "@/components/AuthPages/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const resetPasswordSchema = z.object({
    password: z.string().min(1, {message: 'Preencha todos os campos.'}),
    confirmPassword: z.string().min(1, {message: 'Preencha todos os campos.'}),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas são diferentes.",
        path: ['confirmPassword']
      });
    }})

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export default function ForgotPasswordPage() {
    const searchParams = useSearchParams()
    const [success, setSuccess] = useState(false)
    const [unknownUserError, setUnknownUserError] = useState(false)
    const [error, setError] = useState(false)
    const [tokenError, setTokenError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: {errors}, clearErrors} = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema)
    })

    async function changePassword(data: ResetPasswordSchema) {
        try {
            const token = searchParams.get('token')
            const response = await axios.post(`${process.env.BASE_URL}/user/reset-password`, {password: data.password, token})

            if (response.status === 200) {
                setSuccess(true)
            } else {
                setError(true)
            }
        } catch(error: any) {
            switch (error.response.data.message) {
                case 'Invalid token.':
                case 'Token expired.': 
                    setTokenError(true)
                    setErrorMessage('Seu link está incorreto ou expirado. Tente novamente')
                    break
                case 'User not found.': 
                    setUnknownUserError(true)
                    setErrorMessage('Usuário não encontrado')
                    break
                default:
                    setErrorMessage('Algo deu errado. Tente novamente')
                    setError(true)
            }
        }
    }

    function clearAllErrors() {
        clearErrors('password'); 
        clearErrors('confirmPassword'); 
        setUnknownUserError(false); 
        setError(false);
        setTokenError(false);
    }

    return (
        <div className="flex">
            <Link href='/sign-in'><h1 className="absolute text-white xxs:text-3xl xs:text-4xl cursor-pointer ml-[5%] md:ml-[10%] lg:ml-[50%] 2xl:ml-[1100px] top-[2vh]">&larr;</h1></Link>
            <div className="hidden lg:flex lg:w-2/5 2xl:w-1/2  items-center justify-center">
                <div className="xl:bg-center 2xl:bg-center w-full bg-no-repeat bg-[url('/images/forgot-password-page/honest-letter-about-life-self-love-and-feeling-lost.jpeg')] h-screen bg-[length:auto_100%] hidden lg:block"></div>
            </div>
            <div className='lg:w-3/5 2xl:w-1/2 w-full  sm:ml-0 h-[100vh] text-center px-8 sm:px-16 md:px-32 xl:px-32 py-24 xxs:py-[5vh] xs:py-12 s:py-24 sm:py-16 md:py-24 lg:py-8 xl:py-16'>
                <h1 className='text-gray-200 text-3xl xxs:text-2xl s:text-4xl font-bold mt-24 lg:mt-60'>Redefinir senha</h1>
                <p className='text-gray-400 text-base md:text-2xl  mt-4 font-bold'>Insira a nova senha.</p>

                <div className="sm:max-w-[70%] md:max-w-[70%] lg:max-w-[100%] xl:max-w-[60%] m-auto">
                    <form className="xs:mt-12 xxs:mt-4 s:mt-6 text-left xxs:mb-6 xs:mb-16" onSubmit={handleSubmit(changePassword)}>
                        <Input register={register} type="password" label="Nova senha" registerName="password" setError={() => clearAllErrors()} />                    
                        <Input register={register} type="password" label="Confirme a nova senha" registerName="confirmPassword" setError={() => clearAllErrors()} />                    
                        {
                            (errors || error)
                            &&
                            <Error>{(error || tokenError || unknownUserError) ? errorMessage : (errors.password?.message || errors.confirmPassword?.message)}</Error>
                        }
                        <Button errors={ error || tokenError || unknownUserError || errors.password?.message || errors.confirmPassword?.message ? true:false}>Salvar&ensp;&rarr;</Button>
                        {
                            success
                            &&
                            <p className="text-[#fe235a] text-center font-bold mt-8 text-xl">Senha redefinida!</p>
                        }
                    </form>
                </div>
            </div>
            </div>

    )
}