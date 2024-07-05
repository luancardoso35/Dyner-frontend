'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createAvatar, schema } from '@dicebear/core';
import { adventurer  } from '@dicebear/collection';
import { useMemo } from "react";

type NavigationProps = {
    uri: string
}

export default function Navigation({uri} : NavigationProps) {
    const router = useRouter();
    const imageClassName = 'max-w-8 cursor-pointer invert'

    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 128,
          seed: 'Gracie'
        }).toDataUri();
      }, []);

    return (
            <nav className="text-white flex justify-between lg:items-center lg:gap-10 lg:w-64 lg:flex-col">
                <section className="hidden lg:flex flex-col items-center justify-center gap-6 text-xl font-bold">
                <div className="font-bold text-gray-700 rounded-full bg-gray-400 flex items-center justify-center">
                    <img className="w-32" src={avatar} alt="Logo do inicio"/>
                </div>
                    <p className="text-white">Luan Cardoso</p>
                </section>
                <section className={`${uri === 'dashboard' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2 ' : 'text-gray-200'} text-lg font-bold justify-center  py-3 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/dashboard')}>
                    <Image className={imageClassName} src={uri === 'dashboard' ? require('../../../public/images/menu/home.png') : require('../../../public/images/menu/home-outline.png')} alt="Logo do inicio"/>
                    <p className="hidden lg:block">Início</p>
                </section>
                <section className={`${uri === 'locations' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2' : 'text-gray-200'} text-lg font-bold justify-center  py-3 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/locations')}>
                    <Image className={imageClassName} src={uri === 'locations' ? require('../../../public/images/menu/pin.png') : require('../../../public/images/menu/pin-outline.png')} alt="Locais"/>
                    <p className="hidden lg:block">Locais</p>
                </section>
                <section className=" lg:hidden pt-1 rounded-sm mx-4 w-8 h-8 leading-6 cursor-pointer text-center mt-[0.625rem]">
                    <div className="font-bold text-gray-700 rounded-full bg-[#fe235a] flex items-center justify-center h-8 w-8 text-3xl">+</div>
                </section>
                <section className={`${uri === 'friends' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2' : 'text-gray-200'} text-lg font-bold justify-center  py-3 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/friends')}>
                    <Image className={imageClassName} src={uri === 'friends' ? require('../../../public/images/menu/group.png') : require('../../../public/images/menu/group-outline.png')} alt="Amigos"/>
                    <p className="hidden lg:block">Amigos</p>
                </section>
                <section className={`${uri === 'profile' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2' : 'text-gray-200'} text-lg font-bold justify-center  py-3 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/profile')}>
                    <Image className={imageClassName} src={uri === 'profile' ? require('../../../public/images/menu/user.png') : require('../../../public/images/menu/user-outline.png')} alt="Perfil de usuário"/>
                    <p className="hidden lg:block">Perfil</p>
                </section>
            </nav>
    )
}