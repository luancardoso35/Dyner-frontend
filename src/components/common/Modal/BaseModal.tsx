import { Box, Fade, Modal } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import ModalClose from '@mui/joy/ModalClose';
import { MouseEventHandler } from "react";

export type ModalProps = {
    open: boolean,
    close: () => void,
    children?: React.ReactNode,
    variant?: 'modal' | 'informative'
}

export function BaseModal({ open, close, children, variant }: ModalProps) {
    const style = {
        position: 'absolute' as 'absolute',
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: variant === 'informative' ? 500 : 400,
        bgcolor: '#252a34',
        "font-weight": variant === 'informative' && "bold",
        "font-size": variant === 'informative' && "22px",
        border: '2px solid rgb(71 85 105)',
        boxShadow: 24,
        color: variant === 'informative' ? 'rgb(148 163 184)' : '#fff',
        p: variant === 'informative' ? 8 : 4,
    };

    return (
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={close}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={open}>
                <Box sx={style} className="max-w-[90vw] p-8">
                <ModalClose onClick={close} variant="solid" />
                    {children}
                </Box>
                </Fade>
            </Modal>
    )
}