import { Modal, Box, Typography, IconButton, Backdrop } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function OrderSuccessModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 140,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 320, sm: 420 },
          bgcolor: '#1E5CFF',
          color: 'white',
          borderRadius: 2,
          p: 2.5,
          boxShadow: 24,
          outline: 'none',
          zIndex: 1301,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Congratulations!
        </Typography>

        <Typography variant="body2">
          Your order has been successfully placed on the website.
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          A manager will contact you shortly to confirm your order.
        </Typography>
      </Box>
    </Modal>
  )
}
