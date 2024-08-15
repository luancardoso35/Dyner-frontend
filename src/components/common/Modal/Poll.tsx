import { Box, Card, CardContent, Fade, Modal, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { BaseModal, ModalProps } from './BaseModal';
import Image from "next/image";
import { PollRoundDTO } from "@/dao/PollRoundDTO";
import { UserDTO } from "@/dao/UserDTO";
import axios from "axios";
import { VenueDTO } from "@/dao/VenueDTO";
import { VoteDTO } from "@/dao/VoteDTO";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { UserContext } from "@/contexts/AuthContext";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        className="overflow-y-scroll max-h-56 lg:max-h-96"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

type PollProps = {users: UserDTO[], pollId: string, refreshWithWinner: () => void} & ModalProps

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Poll({ open, close, users, pollId, refreshWithWinner } : PollProps) {
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(false)
    const [rounds, setRounds] = useState<PollRoundDTO[]>([])
    const [venues, setVenues] = useState<VenueDTO[]>([])
    const [userVote, setUserVote] = useState<VoteDTO | null>()
    const [selectedItems, setSelectedItems] = useState<VenueDTO[]>([])
    const [successModalIsOpen, setSuccessModalIsOpen] = useState<boolean>(false)
    const { user } = useContext(UserContext)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setUserVote(null)
        setSelectedItems([])
        setTab(newValue);
    };

    const handleNewVote = async() => {
        const response = await axios.post('http://localhost:3030/vote/',  {
            places: selectedItems,
            userId: user?.id,
            roundId: rounds[tab].id
        })

        if (response.status === 200) {
            setSuccessModalIsOpen(true);
            setUserVote(response.data.data)
            refreshWithWinner();
        }
    }

    const handleSelectPlace = (item: VenueDTO) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id))
        } else {
            setSelectedItems([...selectedItems, item])
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchRounds();

        async function fetchRounds() {
            const responseRounds = await axios.get(`http://localhost:3030/poll/${pollId}/rounds`)
            setRounds(responseRounds.data.data)
            const responseVenues = await axios.get(`http://localhost:3030/venue/${responseRounds.data.data.filter((round: any) => round.roundNumber === tab)[0]?.venuesOnPollRound.map((venue:any) => venue.venueId)}`)
            setVenues(responseVenues.data.data)

            if (!userVote) {
                const userVoteInThisRound = await axios.get(`http://localhost:3030/vote/`, { params: {
                    roundId: responseRounds.data.data.filter((round: any) => round.roundNumber === tab)[0].id,
                    userId: user?.id
                }})
                setUserVote(userVoteInThisRound.data.data)
            }
                
            setLoading(false)
        }
    }, [pollId, tab, user?.id, userVote])

    return (
        <>
        {
            !loading &&
            <BaseModal open={open} close={close}>
                <Typography variant='h5' component={'p'} sx={{mb: '16px'}}  className="text-xl lg:text-2xl">
                    Votação
                </Typography>
                <p id="transition-modal-description" className="mt: 2">
                    <span className='text-[#fe235a] font-bold text-base lg:text-2xl'>Participantes:&nbsp;</span>
                    {
                        users.map((user) => {
                            return (
                                user.name
                            )
                        }).join(', ')
                    }
                    </p>
                        <Tabs variant="scrollable" scrollButtons="auto" value={tab} onChange={handleChange} 
                            aria-label="basic tabs example" textColor='#ffffff'
                            sx={{ mt:2, ".Mui-selected": {
                                color: "#fe235a",
                            }}}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#fe235a"
                                }
                            }}>
                            {
                                rounds?.map((_, key) => {
                                    return (
                                            <Tab value={key} key={key} label={`Rodada ${key+1}`} {...a11yProps(0)} />
                                    )
                                })
                            }
                        </Tabs>
                        <CustomTabPanel value={tab} index={tab}>
                        {
                            rounds.length > 0 &&
                            venues.map((item: any, key: number) => {
                                return (
                                    <div key={key}>
                                        <Card onClick={() => handleSelectPlace(item)} sx={{ cursor: !userVote && 'pointer', color:'white', minWidth: 275, bgcolor: !userVote ? '#252a34' : userVote.venuesOnVote.filter((venue: any) => venue.venueId === item.id).length > 0 ? "#5cb85c" : "#e23636", mt:2, boxShadow:'16'}}>
                                            <CardContent sx={{ display: "flex", alignItems: 'center', gap: '8px' }}>
                                                <Box>
                                                    <Typography component={'span'}  className="flex gap-2 text-base lg:text-lg font-bold">
                                                        <Typography>{item.name}</Typography>
                                                        <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${item.name + ' ' + item.address}`}>
                                                            <Image className="max-w-[16px] max-h-[16px]" src={require('../../../../public/images/common/googleMapsLogo.webp')} alt="Google maps logo"/>
                                                        </Link>
                                                    </Typography>
                                                    <Typography className="text-sm lg:text-base text-white">
                                                        {item.address}
                                                    </Typography>
                                                </Box>
                                                {
                                                    !userVote
                                                    &&
                                                    <CheckCircleOutlineIcon sx={[
                                                        {
                                                            color: 'white'
                                                        },
                                                        selectedItems.filter(selectedItem => item.id === selectedItem.id).length > 0 && {
                                                            color: '#5cb85c'
                                                        }]}
                                                    />
                                                }
                                                
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                        
                        
                        <BaseModal variant="informative" open={successModalIsOpen} close={() => setSuccessModalIsOpen(false)}>Voto registrado com sucesso.</BaseModal>
                        </CustomTabPanel>

                        {
                            !userVote
                            &&
                            <>
                                <Typography variant="h6" sx={{mt: '16px'}}  className="text-center text-slate-400">
                                    {
                                        !userVote
                                        ?
                                        `Escolha ${venues.length === 2 ? '1 lugar' : venues.length % 2 === 0 ? (venues.length/2) + 1 : Math.ceil(venues.length/2) + ' lugares'} para votar` 
                                        :
                                        `Agora é só esperar os outros participantes votarem :)` 
                                    }                
                                </Typography>
                                <button className={`${!(!userVote && selectedItems.length === (venues.length === 2 ? 1 : Math.ceil(venues.length)/2 + 1))  && 'cursor-not-allowed'} 
                                    p-2 text-xl lg:text-2xl rounded bg-[#fe235a] mt-2 font-bold text-[#252a34] w-full`} 
                                    onClick={() => handleNewVote()} disabled={!(!userVote &&
                                    selectedItems.length === (venues.length === 2 ? 1 : Math.ceil(venues.length)/2 + 1))}
                                        >
                                        Votar
                                </button>
                            </>
                        }
                    </BaseModal>
        }
        </>
    )
}