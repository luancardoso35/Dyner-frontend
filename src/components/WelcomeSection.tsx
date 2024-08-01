import { UserContext } from "@/contexts/AuthContext";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useContext, useMemo } from "react";

export default function WelcomeSection() {
    const { user } = useContext(UserContext)
    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 48,
          seed: user?.avatarSeed
        }).toDataUri();
    }, []);

    return (
        <nav className="flex justify-between lg:hidden items-center gap-4">
                <p className="text-2xl">Bem vindo de volta, <span className="text-[#fe235a] font-bold">{user?.name.split(' ')[0]}</span></p>
                <img  src={avatar} alt="Logo do inicio"/>
        </nav>
    )
}