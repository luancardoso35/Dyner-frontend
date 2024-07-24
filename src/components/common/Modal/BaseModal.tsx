import { Box, Fade, Modal } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import ModalClose from '@mui/joy/ModalClose';

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

export type ModalProps = {
    open: boolean,
    close: MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode
}

export function BaseModal({ open, close, children }: ModalProps) {
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