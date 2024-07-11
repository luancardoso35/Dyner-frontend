import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMemo } from "react";

export default function PollDetails() {
    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 32,
          seed: 'Gracie'
        }).toDataUri();
      }, []);
      
    return (
        <div className="bg-gray-600 rounded-xl py-2 px-2 mt-4 shadow-md shadow-gray-700">
            <section className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <img src={avatar} className="lg:w-16" alt="avatar"/>
                    <p className="text-base lg:text-xl">Stephen Curry</p>
                </div>
                <p className="text-slate-400 lg:text-xl">3 horas atrás</p>
            </section>
            <p className="text-center lg:text-xl lg:p-2 mt-2"><span className="font-bold">Vencedor:</span> Golden state warriors</p>
            <div className="flex justify-center">
                <button className="mt-2 lg:p-2 w-full rounded-lg bg-slate-700 p-1 lg:max-w-64 lg:m-auto">Clique para ver mais</button>
            </div>
        </div>
    )
}