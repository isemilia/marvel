import { motion } from "framer-motion";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import motionParams from "../../services/motionParams";

const ComicsPage = () => {
    return (
        <motion.div {...motionParams}>
            <AppBanner/>
            <ComicsList/>
        </motion.div>
    )
}

export default ComicsPage;