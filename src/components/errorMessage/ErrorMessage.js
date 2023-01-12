import img from './error.gif';

const ErrorMessage = (props) => {
    const {customStyle} = props;
    return (
        <img 
            src={img} 
            alt="error" 
            style={{
                maxWidth: '250px', 
                maxHeight: '250px', 
                objectFit: 'contain', 
                margin: 'auto',
                ...customStyle
            }} 
        />
    )
}

export default ErrorMessage;
/* 
process.env.PUBLIC_URL + '/error.gif' if the image is located in /public
*/