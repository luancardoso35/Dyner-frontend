'use client'
import PollDetails from "@/components/common/Cards/PollDetails";
import Nav from "@/components/common/nav";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMemo } from "react";

export default function Dashboard() {
    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 48,
          seed: 'Gracie'
        }).toDataUri();
      }, []);
      
    return (
        <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-between lg:px-36 text-white py-10 h-screen flex flex-col overflow-hidden">
            <nav className="flex justify-between lg:hidden items-center gap-4">
                <p className="text-2xl">Bem vindo de volta, <span className="text-[#fe235a] font-bold">Thompson</span></p>
                <img  src={avatar} alt="Logo do inicio"/>
            </nav>
            <section className="lg:w-8/12 lg:px-32">
                <h1 className="mt-2 text-xl lg:text-3xl">Suas votações recentes</h1>
                    <section className="mt-2 lg:max-h-[85vh] max-h-[60vh] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                        <PollDetails/>
                        <PollDetails/>
                        <PollDetails/>
                        <PollDetails/>
                        <PollDetails/>
                        <PollDetails/>
                        <PollDetails/>
                    </section>
            </section>
            <Nav uri={'dashboard'}/>
        </div>
    )
}