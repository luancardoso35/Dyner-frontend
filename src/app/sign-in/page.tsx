'use client'
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Input from "@/components/AuthPages/Input";
import Error from "@/components/AuthPages/Error";
import Button from "@/components/AuthPages/Button";
import axios from "axios";
import { setCookie } from "nookies";
import { UserContext } from "@/contexts/AuthContext";

const signInSchema = z.object({
    email: z.string().min(1, {message: 'Preencha todos os campos.'}).email({message: 'Email inválido.'}),
    password: z.string().min(1, {message: 'Preencha todos os campos.'}),
})

type SignInSchema = z.infer<typeof signInSchema>

export default function SignInPage() {
    const router = useRouter();
    const { handleChangeUser } = useContext(UserContext)
    const { register, handleSubmit, formState: {errors} } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const [seePassword, setSeePassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [signInError, setSignInError] = useState(false)

    function toggleCheckbox() {
        setRememberMe(!rememberMe)
    }

    async function handleSignIn(data: SignInSchema) {
        try {
            const response = await axios.post('http://localhost:3030/user/sign-in',  {
                email: data.email,
                password: data.password
            })

            if (response.status === 200) {
                handleChangeUser(response.data.data.id)
                setCookie(undefined, 'dyner_auth_token', response.data.token, {
                    ...(rememberMe) ? {maxAge: 60*60*24*365} : {maxAge: 60*60*24},
                })
                router.push('/dashboard')
            }
        } catch (error: any) {
            if (error.response?.data?.message === 'Wrong username or password') {
                setSignInError(true)
            }
        }
    }

    return (
        <div className="overflow-hidden">
            <Link href='/'><h1 className="absolute text-white xxs:text-3xl xs:text-4xl cursor-pointer ml-[5%] md:ml-[10%] lg:ml-[50%] 2xl:ml-[1100px] top-[2vh]">&larr;</h1></Link>
            <div className='flex overflow-hidden'>
                <div className="xl:bg-center 2xl:bg-center w-2/5 2xl:w-1/2 bg-no-repeat lg:bg-[url('/images/sign-in-page/The20deco20de81cor20CIRQA20.webp')] h-screen bg-[length:auto_100%] hidden lg:block">
            </div>
            <div className='lg:w-3/5 2xl:w-1/2 w-full h-[100vh] text-center px-6 sm:px-16 md:px-32 xl:px-32 py-24 xxs:py-[5vh] xs:py-16 s:py-24 sm:py-16 md:py-24 lg:py-8 xl:py-16'>
                <h1 className='text-gray-200 text-3xl xxs:text-2xl s:text-3xl font-bold mt-28 lg:mt-40'>Olá, bem vindo de volta! &#x1F44B;</h1>
                <div className="sm:max-w-[70%] md:max-w-[70%] lg:max-w-[100%] xl:max-w-[60%] m-auto">
                    <form className="xs:mt-12 xxs:mt-8 text-left" onSubmit={handleSubmit(handleSignIn)}>
                        <Input setError={setSignInError} register={register} type="text" label="Email" registerName="email" />
                        <Input setError={setSignInError} register={register} type="password" label="Senha" registerName="password" setState={() => setSeePassword(!seePassword)} state={seePassword} password={true}/>
                        <section className="flex text-white items-center justify-between xs:px-2 xxs:text-sm">
                            <div className="flex items-center gap-1">
                                <input checked={rememberMe} onChange={() => toggleCheckbox()} type="checkbox" className="rounded-xl w-4 h-4"/>
                                <span onClick={() => toggleCheckbox()} className="ml-1">Lembrar</span>
                            </div>

                            <Link href='/forgot-password'><span className="text-gray-400 font-bold">Esqueceu a senha?</span></Link>
                        </section>
                        {
                            errors
                            &&
                            <Error>{errors.email?.message ?? errors.password?.message}</Error>
                        }
                        {
                            signInError
                            &&
                            <Error>Usuário e/ou senha incorreto(s)</Error>
                        }
                        <Button errors={signInError || errors.email?.message || errors.password?.message ? true:false}>Entrar&ensp;&rarr;</Button>
                    </form>

                </div>

                <section className="mt-16 xxs:mt-8">
                    <span className="text-gray-400 font-bold">Não possui uma conta?&ensp;<Link href='/sign-up'><span className="text-[#ff2e63] hover:underline">Crie uma</span></Link></span>
                </section>
            </div>
            </div>
        </div>
    )
}