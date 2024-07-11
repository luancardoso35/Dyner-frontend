'use client'
import VenueDetails from "@/components/common/Cards/PollDetails";
import Nav from "@/components/common/nav";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Locations() {
    const [searchQuery, setSearchQuery] = useState('')
    const [coordinates, setCoordinates] = useState({lat: null, lng: null})
    const [searchAddress, setSearchAddress] = useState('')
    const [venues, setVenues] = useState([])
    const [searched, setSearched] = useState(false)
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState([])

    const avatar = useMemo(() => {
        return createAvatar(adventurer, {
          size: 48,
          seed: 'Gracie'
        }).toDataUri();
    }, []);

    function reset() {
        setLocations([]);
        setVenues([]);
        setSearched(false)
    }

    async function searchVenues(lat:number, lng:number) {
        setLoading(true)
        setSearched(true)
        try {
            const response = await axios.get('http://localhost:3030/venues', { params: {
                            lat,
                            lng,
                            offset: 20*offset,
                            ...(searchQuery !== '' && {query: searchQuery}),
                        }})
            if (response.status === 200) {
                setVenues(response.data.data.response.venues)
            } else {
            }
        } catch (error) {
            const response = await axios.get('http://192.168.1.20:3030/venues', { params: {
                lat,
                lng,
                offset: 20*offset,
                ...(searchQuery !== '' && {query: searchQuery}),
            }})
            if (response.status === 200) {
                setVenues(response.data.data.response.venues)
            } else {
            }
        }
        
        setLoading(false)
    }

    async function searchVenue() {
        setLoading(true)
        setSearched(true)
        try {
            const response = await axios.get('http://localhost:3030/venue', { params: {
                lat: coordinates.lat,
                lng: coordinates.lng,
                query: searchQuery,
            }})
            if (response.status === 200) {
                setVenues(response.data.data.response.groups[0].items)
            } else {
            }
        } catch (error) {
            const response = await axios.get('http://192.168.1.20:3030/venue', { params: {
                lat: coordinates.lat,
                lng: coordinates.lng,
                query: searchQuery,
            }})
            if (response.status === 200) {
                setVenues(response.data.data.response.groups[0].items)
            } else {
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        async function searchLocations() {
            setLoading(true)
            setSearched(true)
            const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: { key: process.env.GEOCODING_API_KEY, q: searchAddress},
            })
            setLocations(response.data.results)
            setLoading(false)
        }

        const delayDebounceFn = setTimeout(() => {
            if (searchAddress.length > 0) {
                searchLocations()
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [offset, searchAddress])

    
    return (
        <div className="px-8 md:px-16 lg:flex lg:flex-row-reverse lg:justify-around text-white pt-[6svh] pb-[14svh] h-screen flex flex-col overflow-hidden">
            <nav className="flex justify-between lg:hidden items-center gap-4">
                <p className="text-2xl">Bem vindo de volta, <span className="text-[#fe235a] font-bold">Thompson</span></p>
                <img  src={avatar} alt="Logo do inicio"/>
            </nav>
            <section className="lg:w-8/12 lg:px-32 flex-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                    <h1 className="mt-2 text-xl lg:text-3xl">Locais</h1>
                    <Image title="Reiniciar busca" onClick={reset} alt="search logo" className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer invert brightness-0" src={require('../../../public/images/common/reset.png')}/>
                    </div>
                    {
                        searched && !loading && venues.length > 0
                        &&
                        <div className="flex items-center gap-4">
                            <input onChange={(event) => setSearchQuery(event.target.value)} className="rounded-xl p-2 bg-slate-700 font-bold w-32 xl:w-80" placeholder="Pesquisar.." type="text" name="" id="" />
                            <Image onClick={searchVenue} alt="search logo" className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer invert brightness-0" src={require('../../../public/images/common/lupa.png')}/>
                        </div>
                    }
                </div>
                <section className={`${loading ? 'flex justify-center items-center' : venues.length > 0 ? 'overflow-y-scroll lg:overflow-y-hidden lg:mt-16 mt-4' : locations.length > 1 && 'lg:mt-[32svh] mt-[5svh]'} h-[100%] mt-4 mb-2 lg:max-h-[80svh]  max-h-[65svh] xxs:max-h-[65svh] xs:max-h-[70svh]  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300`}>
                    {
                        loading 
                        ?
                        <Image className="w-24 h-24" src={require('../../../public/images/common/spinner.svg')} alt="spinner"/>
                        :
                        venues.length > 0
                        ?
                        <section className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4 ">
                            {
                                venues.map((venue: any, key) => {
                                    let address = ''
                                    if (venue["object"] !== undefined) {
                                        if (venue.object['location'] !== undefined) {
                                            address = address + (venue.object.location.address === undefined ? "" : `${venue.object.location.address}, `)
                                            address = address + (venue.object.location.city === undefined ? "" : `${venue.object.location.city}, `)
                                            address = address + (venue.object.location.state === undefined ? "" : `${venue.object.location.state}`)
                                            address = address.replace(/,\s*$/, "");
                                        }
                                    }
                                    return (
                                        venue["object"] !== undefined
                                        ?
                                        venue.type !== 'query' &&
                                        <div key={key} className="border-2 border-slate-400 rounded-lg p-2 lg:p-4 shadow-lg shadow-slate-500/50">
                                            <div className="flex gap-2">
                                                <h1 className="max-w-[70%]">{venue.object.name}</h1>
                                                <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${venue.object.name + ' ' + address}`}><Image className="max-w-[24px] max-h-[24px]" src={require('../../../public/images/common/googleMapsLogo.webp')} alt="Google maps logo"/></Link>
                                            </div>
                                            <p className="mt-1 lg:mt-2 text-slate-400">{address}</p>
                                        </div>
                                        :
                                        <div key={key} className="border-2 border-slate-400 rounded-lg p-2 lg:p-4 shadow-lg shadow-slate-500/50">
                                            <div className="flex gap-2">
                                                <h1 className="max-w-[70%]">{venue.name}</h1>
                                                <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${venue.name + ' ' + venue.location.address ? venue.location.address + ', ' + venue.location.city + ', ' + venue.location.state : venue.location.formattedAddress.join(', ')}`}><Image className="max-w-[24px] max-h-[24px]" src={require('../../../public/images/common/googleMapsLogo.webp')} alt="Google maps logo"/></Link>
                                            </div>
                                            <p className="mt-1 lg:mt-2 text-slate-400">{venue.location.address ? venue.location.address + ', ' + venue.location.city + ', ' + venue.location.state : venue.location.formattedAddress.filter((addressLine:string) => !/\d+/.test(addressLine)).join(', ')}</p>
                                        </div>
                                    )
                                })
                            }
                        </section>
                        :
                        locations.length === 0
                        ?
                        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                            <p className="text-center text-3xl text-slate-400">{searched ? 'Ops... Não encontramos nenhum local :(' : 'Comece digitando seu endereço na barra de pesquisa.'}</p>
                                {
                                    searched &&
                                    <p className="text-center text-3xl text-slate-400">{'Tente buscar novamente'}</p>
                                }
                            {
                                !loading 
                                &&
                                <div className="flex items-center gap-4">
                                    <input onChange={(event) => setSearchAddress(event.target.value)} className="rounded-xl p-3 bg-slate-700 text-xl w-[80vw] xl:w-[30vw]" type="text" name="" id="" />
                                </div>
                            } 
                        </div>
                        :
                        locations.length > 0
                        &&
                        <div className="flex items-center justify-center flex-col">
                            <p className="text-center text-xl lg:text-3xl text-slate-400 mb-4">Escolha um local, ou pesquise outro.</p>
                            <input onChange={(event) => setSearchAddress(event.target.value)} placeholder="Pesquisar.." className="rounded-xl px-3 py-2 lg:p-3 bg-slate-700 text-xl w-[80vw] xl:w-[30vw]" type="text" name="" id="" />
                            <ul className={`${locations.length>7 ? 'overflow-y-scroll' : 'overflow-y-hidden'}flex flex-col gap-3 xxs:max-h-[40svh] lg:max-h-[15svh] mt-5 w-[80vw] xl:w-[40vw]`}>
                            {
                                locations.map((location: any, key) => {
                                    return (
                                        <li onClick={() => {setCoordinates(location.geometry); searchVenues(location.geometry.lat, location.geometry.lng)}} key={key} className="flex gap-4 cursor-pointer justify-start items-center border-2 border-slate-400 rounded-md p-2">
                                            <Image alt="pin logo" src={require('../../../public/images/menu/pin.png')} className="w-6 lg:w-8 h-6 lg:h-8"/>
                                            <p className="" >{location.formatted}</p>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    }
                    
                </section>
            </section>
            <Nav uri={'locations'}/>
        </div>
    )
}