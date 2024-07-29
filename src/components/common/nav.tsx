'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createAvatar, schema } from '@dicebear/core';
import { adventurer  } from '@dicebear/collection';
import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BottomNavigation, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { UserContext } from "@/contexts/AuthContext";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: white;
  &.Mui-selected {
    color: #fe3165;
  }
`);

const uriToIntValue : { [key: string]: any } = {
    dashboard: 0,
    locations: 1,
    friends: 2,
}

type NavigationProps = {
    uri: string
}

const jose = require("jose");

export default function Navigation({uri} : NavigationProps) {
    const router = useRouter();
    const imageClassName = 'max-w-8 cursor-pointer invert'
    const [value, setValue] = useState(uriToIntValue[uri]);
    const { user } = useContext(UserContext)

    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 128,
          seed: user?.avatarSeed
        }).toDataUri();
      }, [user?.avatarSeed]);

    return (
            <>
                <nav className="hidden lg:flex mt-0 text-white items-center gap-6 justify-normal w-64 flex-col mb-0">
                    <Link className="mb-8" href={'/dashboard'}>
                        <section className="hidden lg:flex items-center gap-3">
                                <Image className="w-16 h-16" src={require('../../../public/images/logo.png')} alt="Dyner logo"/>
                                <p className="text-[#fe235a] text-2xl translate-y-1">Dyner</p>
                        </section>  
                    </Link>
                    <section className="hidden lg:flex flex-col items-center justify-center gap-6 text-xl font-bold">
                        <div className="font-bold text-gray-700 rounded-full bg-gray-400 flex items-center justify-center">
                            <img className="w-32" src={avatar} alt="User Avatar"/>
                        </div>
                        <p className="text-white">{user?.name}</p>
                    </section>
                    <section className={`${uri === 'dashboard' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2 ' : 'text-gray-200'} text-lg font-bold justify-center py-2 md:mt-4 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/dashboard')}>
                        <Image className={imageClassName} src={uri === 'dashboard' ? require('../../../public/images/menu/home.png') : require('../../../public/images/menu/home-outline.png')} alt="Logo do inicio"/>
                        <p className="hidden lg:block">Início</p>
                    </section>
                    <section className={`${uri === 'locations' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2' : 'text-gray-200'} text-lg font-bold justify-center py-2 md:mt-4 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/locations')}>
                        <Image className={imageClassName} src={uri === 'locations' ? require('../../../public/images/menu/pin.png') : require('../../../public/images/menu/pin-outline.png')} alt="Locais"/>
                        <p className="hidden lg:block">Locais</p>
                    </section>
                    <section className="lg:hidden pt-1 rounded-sm mx-4 md:mx-12 w-8 h-8 leading-6 cursor-pointer text-center md:mt-3 mt-[0.5vh]">
                        <div className="font-bold text-gray-700 rounded-full bg-[#fe235a] flex items-center justify-center h-8 w-8 text-3xl">+</div>
                    </section>
                    <section className={`${uri === 'friends' ? 'lg:text-[#252a34] lg:bg-gray-200 lg:border-b-2' : 'text-gray-200'} text-lg font-bold justify-center py-2 md:mt-4 rounded-xl w-full cursor-pointer flex gap-4 items-center`} onClick={() => router.push('/friends')}>
                        <Image className={imageClassName} src={uri === 'friends' ? require('../../../public/images/menu/group.png') : require('../../../public/images/menu/group-outline.png')} alt="Amigos"/>
                        <p className="hidden lg:block">Amigos</p>
                    </section>
                </nav>

                <Box className="lg:hidden" sx={{ 
                    marginLeft: '-32px',
                    maxWidth: '100vw',
                    width: '100vw',
                    position: 'fixed',
                    bottom: '0px',
                }}>
                <BottomNavigation
                    sx={{bgcolor:'#252a34'}}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction 
                        LinkComponent={Link}
                        href={'/dashboard'}
                        label="Início" icon={<HomeIcon sx={{"& .Mui-selected, .Mui-selected": {color: "#000"}}}/>} 
                    />
                    <BottomNavigationAction 
                        LinkComponent={Link}
                        href={'/locations'}
                        label="Locais" icon={<PlaceIcon sx={{"& .Mui-selected, .Mui-selected": {color: "#000"}}}/>} 
                    />
                    <BottomNavigationAction 
                        LinkComponent={Link}
                        href={'/friends'}
                        label="Amigos" icon={<GroupIcon sx={{"& .Mui-selected, .Mui-selected": {color: "#000"}}}/>} 
                    />
                </BottomNavigation>
                </Box>
            </>
    )
}