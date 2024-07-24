import { Box, Card, CardContent, Fade, Modal, Tab, Tabs, Typography } from "@mui/material";
import { useState } from 'react';
import Link from 'next/link';
import { BaseModal, ModalProps } from './BaseModal';
import Image from "next/image";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
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

type Participant = {
    name: string
}

type PollProps = {
    participants: Participant[],
    rounds: object[]
} & ModalProps

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const style = {
    position: 'absolute' as 'absolute',
    borderRadius: '16px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#252a34',
    border: '2px solid rgb(71 85 105)',
    boxShadow: 24,
    color:'#fff',
    p: 4,
};

export default function Poll({ open, close, participants, rounds } : PollProps) {
    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
      };

    return (
        <BaseModal open={open} close={close}>
                    <p className="text-xl lg:text-3xl">
                        Votação
                    </p>
                    <p id="transition-modal-description" className="mt: 2">
                        <span className='text-[#fe235a] font-bold text-base lg:text-2xl'>Participantes:&nbsp;</span>
                        {
                            participants.map((participant) => {
                                return (
                                    participant.name
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
                                rounds.map((round, key) => {
                                    return (
                                            <Tab value={key} key={key} label={`Rodada ${key+1}`} {...a11yProps(0)} />
                                    )
                                })
                            }
                        </Tabs>
                        <CustomTabPanel value={tab} index={tab}>
                        {
                            rounds[tab].map((item: any, key: number) => {
                                return (
                                    <div key={key}>
                                         <Card sx={{ color:'white', minWidth: 275, bgcolor: item.selected ? "#5cb85c" : "#e23636", mt:2, boxShadow:'16'}}>
                                            <CardContent>
                                                <p className="flex gap-2 text-base lg:text-lg font-bold">
                                                    <p>{item.name}</p>
                                                    <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${item.name + ' ' + item.address}`}>
                                                        <Image className="max-w-[16px] max-h-[16px]" src={require('../../../../public/images/common/googleMapsLogo.webp')} alt="Google maps logo"/>
                                                    </Link>
                                                </p>
                                                <p className="text-sm lg:text-base text-white">
                                                    {item.address}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                        })}
                        </CustomTabPanel>

            </BaseModal>
    )
}