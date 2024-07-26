'use client'
import Image from "next/image";
import { useState } from "react";

type InputProps = {
    type: string,
    label: string,
    register: any,
    registerName: string,
    password?: boolean,
    setState?: Function,
    setError: Function,
    state?: boolean
}

export default function Input({label, type, register, registerName, setState, state, password, setError}: InputProps) {
    const [inputType, setInputType] = useState('password')
    return (
        <>
            <label htmlFor={registerName} className="text-white ml-3 inline-block xxs:text-sm xs:text-base">{label}</label>
            <input onKeyDown={() => setError(false)} {...register(registerName)} id={registerName} className="border-[#b4b4b4] border-2 xs:text-lg rounded-xl font-bold text-gray-300 bg-gray-600 px-3 sm:px-6 xs:py-3 s:py-3 block w-full py-3 mb-4 xxs:text-sm" type={password ? inputType : type}/>
            {
                password 
                &&
                <Image onClick={() => {
                        if (inputType === 'password')
                            setInputType('text')
                        else 
                            setInputType('password')
                        if (setState) 
                            setState(!state)
                    }
                } className="s:-mt-[53px] brightness-0 invert -mt-[53px] opacity-90 mr-5 w-5 h-5 float-right" src={state ? require("../../../public/images/common/closed-eye.png") : require("../../../public/images/common/eye.png")} alt="icone de olho"/>
            }
        </>
    )
}