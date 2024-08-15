'use client'
import { UserContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';

const jose = require('jose');

export default function LandingPage() {
  const { handleChangeUser, user } = useContext(UserContext)
  const [userLoaded, setUserLoaded] = useState(false)
  const router = useRouter()
  const token = parseCookies()['dyner_auth_token']

  useEffect(() => {
    if (!userLoaded) {
      handleUser();
    }
    setUserLoaded(true);

    async function handleUser() {
      if (!token) {
        return;
      }
      
      try {
        const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SECRET))
                            
        handleChangeUser(payload.userId)
      } catch (error) {
        console.log(error);
      }
    }

  },[handleChangeUser, router, token, userLoaded])

  return (
    <div className='flex overflow-hidden'>
      <div className="xl:bg-right 2xl:bg-right w-2/5 2xl:w-1/2 bg-no-repeat lg:bg-[url('/images/landing-page/meal-lg.jpg')] xl:bg-[url('/images/landing-page/meal-xl.jpg')] 2xl:bg-[url('/images/landing-page/meal-2xl.jpg')] h-screen bg-[length:auto_100%] hidden lg:block">
      </div>
      <div className='lg:w-3/5 2xl:w-1/2 w-full h-[100vh] font-bold px-14 sm:px-16 md:px-24 xl:px-32 py-24 xxs:py-[10vh] xs:py-[12vh] sm:py-16 md:py-24 lg:py-8 xl:py-16 '>
        <h1 className='m-auto text-center text-gray-200 leading-tight s:text-6xl xxs:text-4xl xs:text-5xl sm:mt-4 max-w-96 md:max-w-none lg:max-w-lg xl:max-w-xl'>Comece a decidir de forma prática</h1>
        <p className='text-gray-400 m-auto text-center mt-6 text-sm sm:text-md lg:text-lg'>Com <span className='text-[#ff2e63]'>Dyner</span>, você decide em conjunto o que é melhor para todos.</p>
        <Image className='mb-6 xxs:mb-8 xs:mb-16 sm:mb-10 md:mb-14 lg:mb-10 xl:mb-16 mt-2 xxs:mt-[5vh] xs:mt-10 sm:mt-6 md:mt-10 lg:mt-6 xl:mt-14 text-gray-200 max-w-sm xxs:max-w-[60vw] xs:max-w-[300px] max-h-sm m-auto' src={require("../../public/images/logo.png")} alt='Dyner logo'/>
          <button onClick={() => {router.push(`${user?.name ? '/dashboard' : '/sign-in'}`)}} className="text-gray-200 before:ease block m-auto bg-[#fe3165] hover:bg-[#fe235a] transition duration-500 border-[#b4b4b4] rounded-lg border-2 text-xl max-w-md md:max-w-xl p-4 w-full">
            Comece agora&ensp;&rarr;
          </button>
      </div>
    </div>
  );
}