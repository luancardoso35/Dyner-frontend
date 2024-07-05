'use client';
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import Link from 'next/link';
import Input from '@/components/AuthPages/Input';
import Error from '@/components/AuthPages/Error';
import Button from '@/components/AuthPages/Button';
import AvatarPicker from '@/components/AuthPages/AvatarPicker';

const signUpSchema = z.object({
    name: z.string().min(1, {message: 'Preencha todos os campos.'}),
    email: z.string().min(1, {message: 'Preencha todos os campos.'}).email({message: 'Email inválido.'}),
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

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const router = useRouter();
    const [avatarSeed, setAvatarSeed] = useState('')
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
    const { register, handleSubmit, formState: {errors}} = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    function signUp(data: SignUpSchema) {
        const signUpData = {...data, avatarSeed}
    }

    return (
        <div className="overflow-hidden">
            <Link href={'/sign-in'}><h1 className="absolute text-white xxs:text-3xl xs:text-4xl cursor-pointer ml-[5%] md:ml-[10%] lg:ml-[50%] 2xl:ml-[1100px] top-[2vh]">&larr;</h1></Link>
            <div className='flex overflow-hidden'>
                <div className="xl:bg-center 2xl:bg-center w-2/5 2xl:w-1/2 bg-no-repeat lg:bg-[url('/images/sign-up-page/rawImage2.jpg')] xl:bg-[url('/images/sign-up-page/rawImage.jpg')] h-screen bg-[length:auto_100%] hidden lg:block">
            </div>
            <div className='lg:w-3/5 2xl:w-1/2 w-full h-[100vh] text-center px-8 sm:px-16 md:px-32 xl:px-32 py-24 xxs:py-[5vh] xs:py-12 s:py-24 sm:py-16 md:py-24 lg:py-8 xl:py-16'>
                <h1 className='text-gray-200 text-3xl font-bold mt-4 lg:mt-16'>Criar uma conta</h1>
                <p className='text-gray-400 hidden lg:block text-sm lg:text-xl mt-1 lg:mt-4 font-bold'>Comece hoje a decidir o que é melhor para todos.</p>
                <div className="sm:max-w-[70%] md:max-w-[70%] lg:max-w-[100%] xl:max-w-[60%] m-auto">
                    <form className="mt-2 lg:mt-8 text-left" onSubmit={handleSubmit(signUp)}>
                        <AvatarPicker setSeed={setAvatarSeed}/>
                        <Input label='Nome completo' register={register} registerName='name' type='text'/>
                        <Input register={register} type="text" label="Email" registerName="email" />                    
                        <Input register={register} type="password" label="Senha" registerName="password" setState={() => setSeePassword(!seePassword)} state={seePassword} password={true}/>
                        <Input register={register} type="password" label="Confirme sua senha" registerName="confirmPassword" setState={() => setSeeConfirmPassword(!seeConfirmPassword)} state={seeConfirmPassword} password={true}/>
                        {
                            errors
                            &&
                            <Error>
                                {errors.email?.message ?? errors.password?.message ?? errors.name?.message ?? errors.confirmPassword?.message}
                            </Error>
                        }
                        <Button errors={errors.email?.message || errors.password?.message || errors.name?.message || errors.confirmPassword?.message ? true:false}>Criar conta&ensp;&rarr;</Button>

                    </form>
                </div>
                <section className="mt-4 lg:mt-8">
                    <span className="text-gray-400 font-bold">Já possui uma conta?&ensp;<Link href='/sign-in'><span className="text-[#ff2e63] hover:underline">Entre aqui</span></Link></span>
                </section>

            </div>
            </div>
        </div>
    )
}