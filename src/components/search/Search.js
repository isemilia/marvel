import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrMsg } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './search.scss';

const setContent = (process, char) => {
    switch (process) {
        case 'waiting':
            return;
        case 'loading': 
            return <Spinner/>;
        case 'confirmed':
            return <div className="search-message-success">
                        <span>There is! Visit {char[0].name} page?</span>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>;
        case 'error':
            return <div className="search-message-error">{ErrorMessage}</div>;
        case 'not-found':
            return <div className="search-message-error">The character was not found. Check the name and try again</div>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default function Search() {
    const [char, setChar] = useState({});
    const {clearError, getCharByName, process, setProcess} = useMarvelService();

    const onCharLoaded = char => {
        setChar(char);
        if (char[0]) {
            setProcess('confirmed');
        } else {
            setProcess('not-found');
        }
    }

    const updateChar = (name) => {
        setProcess('loading');

        getCharByName(name)
            .then(onCharLoaded)
    }

    return (
        <div className="search">
            <h2 className="search-title">Or find a character by name:</h2>
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}>
                <Form className="search-form">
                    <Field 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        disabled={process === 'loading'}>
                        <div className="inner">find</div>
                    </button>
                </Form>
                {/* <FormikErrMsg component="div" className="search-message-error" name="charName" /> */}
            </Formik>
            <div className="search-message">
                {setContent(process, char)}
            </div>
        </div>
    )
}