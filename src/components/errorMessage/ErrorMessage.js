import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} alt="error" style={{maxWidth: '250px', maxHeight: '250px', objectFit: 'contain', margin: 'auto'}} />
    )
}

export default ErrorMessage;
/* 
process.env.PUBLIC_URL + '/error.gif' if the image is located in /public
*/