'use client'
import Image from "next/image";
import { espana } from "../../lib/fonts";
export default function Custom404() {
    return (
        <div className={`${espana.className} text-white font-espana px-[10vw] s:pt-[20vh] xxs:pt-[15vh] sm:pt-[20vh]`}>
            <div className=" flex items-center justify-center flex-row text-[30vw] md:text-[200px]">
                    <span className="mr-5 md:mr-16">4</span>
                    <Image className="max-w-[30vw] md:max-w-64" src={require('../../public/images/error-page/donut.png')} alt="donut formando um 0"/>
                    <span className="ml-5 md:ml-16">4</span>
            </div>
            <div className="text-center s:mt-32 xxs:mt-16 ">
                <p className="s:text-5xl xxs:text-4xl xxs:leading-[3rem]"><span className="text-[#ff2e63]">Ooops!</span> Parece que não temos o que você procura.</p>
            </div>            
        </div>
    )
}