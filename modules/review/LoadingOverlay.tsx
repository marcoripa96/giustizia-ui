import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"

const OverlayLoading = styled(motion.div)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  inset: 0,
  background: 'white'
})

const LoadingSpinner = styled(motion.div)({
  width: '20px',
  height: '20px',
  // border: '2px solid #000'
  background: '#000'
})

type LoadingOverlayProps = {
  show?: boolean;
}

const LoadingOverlay = ({ show }: LoadingOverlayProps) => {
  return (
    <AnimatePresence>
      {show && (
        <OverlayLoading
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className="flex flex-col items-center gap-6">
            <LoadingSpinner
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["10%", "10%", "50%", "50%", "10%"]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
            </LoadingSpinner>
            <span className="text-xl tracking-widest">Loading...</span>
          </div>

        </OverlayLoading>
      )}
    </AnimatePresence>
  )
}

export default LoadingOverlay;