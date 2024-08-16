import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Alert.module.css"

type AlertProps = {
    children: ReactNode,
    seconds?: number
}

export default function Alert({ children, seconds }: AlertProps) {

    const [active, setActive] = useState(true)

    if (seconds) {
        setTimeout(() => {
            setActive(false)
        }, seconds * 1000);
    }

    return (
        <AnimatePresence>
            {active &&
                <motion.div
                    className={styles.alert}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className={styles.icon}>
                        <svg className="fill-current h-6 w-6 text-white mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                    </div>
                    <p className={styles.text}>
                        {children}
                    </p>
                </motion.div>
            }
        </AnimatePresence>
    )
}