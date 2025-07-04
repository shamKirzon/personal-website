"use client"

import { motion, type Variants } from "motion/react"

function LoadingThreeDotsPulse() {
    const dotVariants: Variants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {

    const height = "0.7rem"

    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }

            .dot {
                width: ${height};
                height: ${height};
                border-radius: 50%;
                background-color: #ffffff;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsPulse
