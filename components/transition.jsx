import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
    scaleDown: {
        scale: 0.75,
        y: 100,
        transition: {
            duration: 0.1
        }
    },
    out: {
        x: "-100%",
        transition: {
            duration: 0.1,
            delay: 0.25
        }
    },
    in: {
        scale: 0.75,
        y: 100,
        x: "100%",
        transition: {
            duration: 0.1
        }
    },
    center: {
        x: 0,
        scale: 0.75,
        transformOrigin: 'top',
        transition: {
            duration: 0.1
        }
    },
    scaleUp: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.1,
            delay: 0.25
        }
    },
};

const TransitionDiv = ({ children }) => {
    const { asPath } = useRouter();
    return (
        <div className="effect"
            style={{
                overflow: 'hidden'
            }}>
            <AnimatePresence
                initial={false}
                mode='wait'
            >
                <motion.div
                    key={asPath}
                    variants={variants}
                    initial="in"
                    animate={["center", "scaleUp"]}
                    exit={["scaleDown", "out"]}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TransitionDiv;