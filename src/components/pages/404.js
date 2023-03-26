import { Link } from "react-router-dom"
import { motion } from "framer-motion";

import ErrorMessage from "../errorMessage/ErrorMessage";
import motionParams from "../../services/motionParams";

const Page404 = () => {
    return (
        <motion.div {...motionParams}>
            <div style={{display: 'grid', placeContent: 'center', rowGap: '15px', textAlign: 'center'}}>
                <ErrorMessage />
                <h2>This page does not exist</h2>
                <Link to={'/'} style={{textDecoration: 'underline'}}>Back to main page</Link>
            </div>
        </motion.div>
    )
}

export default Page404;