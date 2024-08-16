import { FormControl, OutlinedInput, Select, Typography } from "@mui/material";
import { BaseModal, ModalProps } from "./BaseModal";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { UserContext } from "@/contexts/AuthContext";
import { PollDTO } from "@/dao/PollDTO";

type NewPollProps = {
    handleNewPoll: (newPoll: PollDTO) => void
} & ModalProps

export function NewPoll({open, close, handleNewPoll}: NewPollProps) {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const [locations, setLocations] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [coordinates, setCoordinates] = useState({lat: null, lng: null})
    const [offset, setOffset] = useState(0)
    const [searchAddress, setSearchAddress] = useState('')
    const [venues, setVenues] = useState([])
    const [searched, setSearched] = useState(false)
    const [persons, setPersons] = useState<string[]>([]);
    const [selectedVenues, setSelectedVenues] = useState<{id: string, name: string, address: string}[]>([]);
    const friends = user?.friends
    const [successModalIsOpen, setSuccessModalIsOpen] = useState<boolean>(false)

    function reset() {
        setCoordinates({lat: null, lng: null})
        setLocations([]);
        setVenues([]);
        setSearched(false)
        setSelectedVenues([]);
        setPersons([]);
    }

    async function createPoll() {
        try {
            const response = await axios.post('http://localhost:3030/poll', {
                participants: [...persons, user?.id],
                venues: selectedVenues
            })

            setSuccessModalIsOpen(response.status === 200 && response.data.success)
            handleNewPoll(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    function handleVenueChange(newVenue: { id: string, name: string, address: string }) {
        const selectedVenue = selectedVenues.filter((venue: any) => venue.id === newVenue.id)
        if (selectedVenue.length === 0) {
            setSelectedVenues([...selectedVenues, newVenue])
        } else {
            const newVenues = selectedVenues.filter((venue: any) => venue.id !== newVenue.id)
            setSelectedVenues(newVenues)
        }
    }

    function handleChange (event: SelectChangeEvent<typeof persons>) {
        const {
            target: { value },
          } = event;
          setPersons(
            typeof value === 'string' ? value.split(',') : value,
    );};

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
        <>
            <BaseModal open={open} close={() => {close(); reset();}}>
                <p className="text-xl lg:text-2xl">
                    Nova votação
                </p>
                <FormControl sx={{ mt: 4, width: 300, maxWidth: '100%' }}>
                    <InputLabel 
                        sx={{
                            color:'#fe235a', fontSize: 18,
                            "&.Mui-focused": {
                            color: "#fe235a"
                            }
                        }}>Participantes</InputLabel>
                    
                    <Select
                        inputProps={{
                            MenuProps: {
                                MenuListProps: {
                                    sx: {
                                        backgroundColor: '#252a34',
                                        color: '#fff',
                                    }
                                }
                            }
                        }}
                        sx={{
                        color: "white",
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(228, 219, 233, 0.25)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(228, 219, 233, 0.25)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(228, 219, 233, 0.25)',
                        },
                        '.MuiSvgIcon-root ': {
                            fill: "white !important",
                        }
                        }}
                    multiple
                    value={persons}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Participantes" className="text-[18px]"/>}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((personId) => (
                            <Chip sx={{color: 'white'}} key={personId} label={friends?.find(friend => friend.id === personId)?.name} />
                        ))}
                        </Box>
                    )}
                    >
                    {
                        friends
                        &&
                        friends.map((friend) => {
                            return (
                                    <MenuItem
                                        key={friend.id}
                                        value={friend.id}
                                    >
                                            {friend.name}
                                    </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, width: 300, maxWidth: '100%' }}>
                {
                            loading 
                            ?
                            <Image className="w-12 h-12 m-auto mt-2" src={require('../../../../public/images/common/spinner.svg')} alt="spinner"/>
                            :
                            coordinates.lat
                            ?
                            <div>
                                <p className="text-lg">Escolha os locais a serem votados</p>
                                <div className="w-full flex justify-end items-center relative">
                                    <input onChange={(event) => setSearchQuery(event.target.value)} className="rounded p-3 bg-[#252a34] border-gray-500 border-[1px] text-xl w-full mt-1" placeholder="Pesquisar.." type="text" name="" id="" />
                                    <Image onClick={searchVenue} alt="search logo" className="w-4 h-4 cursor-pointer invert brightness-0 absolute mr-4" src={require('../../../../public/images/common/lupa.png')}/>
                                </div>
                                {   
                                    venues.length > 0
                                    &&
                                    <>
                                        <ul className={`${locations.length>7 ? 'overflow-y-scroll' : 'overflow-y-hidden'}flex flex-col gap-3 xxs:max-h-[40svh] lg:max-h-[15svh] mt-5 w-full`}>
                                            {
                                                venues.filter((venue: any) => venue.type !== 'query').map((venue: any, key) => {
                                                    const { object } = venue;
                                                    let address = '';
                                                    address = address + (object.location.address === undefined ? "" : `${object.location.address}, `)
                                                    address = address + (object.location.city === undefined ? "" : `${object.location.city} - `)
                                                    address = address + (object.location.state === undefined ? "" : `${object.location.state}`)
                                                    address = address.replace(/,\s*$/, "");
                                                    return (
                                                        <li key={key} value={object.name} onClick={() => handleVenueChange({id: object.id, name: object.name, address})}  className="flex cursor-pointer gap-4 justify-start items-center border-2 border-slate-400 rounded-md p-2 lg:text-lg" >
                                                            <div>
                                                                <div className="flex gap-2">
                                                                    <h1 className="max-w-[70%]">{object.name}</h1>
                                                                    <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${object.name + ' ' + address}`}><Image className="max-w-[16px] max-h-[16px]" src={require('../../../../public/images/common/googleMapsLogo.webp')} alt="Google maps logo"/></Link>
                                                                </div>
                                                                <p className="text-sm lg:text-base text-slate-400">{address}</p>
                                                            </div>
                                                            <CheckCircleOutlineRoundedIcon sx={{color: selectedVenues.filter((venue: any) => venue.id === object.id).length > 0 ? '#5cb85c' : '#fff'}} />
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        {
                                            selectedVenues.length > 0 &&
                                            <div className="mt-2 mb-2">
                                                <span className="font-bold">Selecionados: </span>
                                                {
                                                    selectedVenues.map((venue: any) => venue.name).join(', ')
                                                }
                                            </div>
                                        }
                                        {
                                            selectedVenues.length > 1 
                                            &&
                                            persons.length > 0
                                            &&
                                            <button className="p-2 rounded bg-[#fe235a] mt-2 font-bold text-[#252a34] w-full" onClick={createPoll}>Salvar</button> 
                                        }
                                    </>
                                }
                            </div>
                            :  
                            locations.length === 0
                            ?
                            <div className="w-full h-full">
                                <p className="text-center text-lg text-slate-400" >{
                                searched ? 'Não encontramos nenhum local :(' : 'Insira um endereço base'}</p>
                                    {
                                        searched &&
                                        <p className="text-center text-xl text-slate-400">{'Tente buscar novamente'}</p>
                                    }
                                {
                                    !loading 
                                    &&
                                    <div className="flex items-center gap-4">
                                        <input onChange={(event) => setSearchAddress(event.target.value)} className="rounded p-3 bg-[#252a34] border-gray-500 border-[1px] text-md lg:text-xl w-full mt-1" type="text" name="" id="" />
                                    </div>
                                } 
                            </div>
                            :
                            locations.length > 0
                            &&
                            <div className="">
                                <p className="text-lg">Escolha um local, ou pesquise outro.</p>
                                <input onChange={(event) => setSearchAddress(event.target.value)} placeholder="Pesquisar.." className="rounded p-3 bg-[#252a34] border-gray-500 border-[1px] text-xl w-full" type="text" name="" id="" />
                                <ul className={`${locations.length>7 ? 'overflow-y-scroll' : 'overflow-y-hidden'} flex flex-col gap-3 xxs:max-h-[40svh] lg:max-h-[15svh] mt-5 w-full`}>
                                {
                                    locations.map((location: any, key) => {
                                        return (
                                            <li onClick={() => {setCoordinates(location.geometry)}} key={key} className="flex gap-4 cursor-pointer justify-start items-center border-2 border-slate-400 rounded-md p-2">
                                                <Image alt="pin logo" src={require('../../../../public/images/menu/pin.png')} className="w-6 lg:w-8 h-6 lg:h-8"/>
                                                <p className="" >{location.formatted}</p>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        }
                </FormControl>
            </BaseModal>
            <BaseModal variant="informative" open={successModalIsOpen} close={() => setSuccessModalIsOpen(false)}>Votação criada com sucesso.</BaseModal>
        </>
    )
}