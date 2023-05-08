import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import motionParams from "../../services/motionParams";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Our comics"
                    />
                <title>Marvel Comics</title>
            </Helmet>
            <motion.div {...motionParams}>
                <AppBanner/>
                <ComicsList/>
            </motion.div>
        </>
    )
}

export default ComicsPage;