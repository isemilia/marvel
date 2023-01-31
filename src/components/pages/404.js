import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div style={{display: 'grid', placeContent: 'center', rowGap: '15px', textAlign: 'center'}}>
            <ErrorMessage />
            <h2>This page does not exist</h2>
            <Link to={'/'} style={{textDecoration: 'underline'}}>Back to main page</Link>
        </div>
    )
}

export default Page404;