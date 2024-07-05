'use client'

import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useEffect, useMemo, useState } from "react";

type AvatarPickerProps = {
    setSeed: Function
}

export default function AvatarPicker({setSeed} : AvatarPickerProps) {
    const [avatarSeed, setAvatarSeed] = useState('')
    useEffect(() => {
        setSeed(avatarSeed)
    }, [avatarSeed, setSeed])

    function generateNewAvatar() {
        const char = String.fromCharCode(97+Math.floor(Math.random() * 26))
        setAvatarSeed(avatarSeed + char)
    }

    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          seed: avatarSeed
        }).toDataUri();
      }, [avatarSeed]);

    return (
        <>
            <label className="text-white inline-block xxs:text-sm xs:text-base w-full text-center mt-2">Imagem de perfil</label>
            <div className="flex items-center text-base lg:text-4xl text-gray-400 justify-center">
                <p className="cursor-pointer" onClick={() => setAvatarSeed(avatarSeed.substring(0, avatarSeed.length-1))}>{'<'}</p>
                <img className="w-16 h-16 lg:w-32 lg:h-32" src={avatar} alt="Avatar picker"/>
                <p className="cursor-pointer" onClick={generateNewAvatar}>{'>'}</p>
            </div>
        </>
    )
}