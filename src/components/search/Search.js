import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrMsg } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './search.scss';

export default function Search() {
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharByName} = useMarvelService();

    const onCharLoaded = char => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharByName(name)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <div className="search-message-error">{ErrorMessage}</div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="search-message-success">
                        <span>There is! Visit {char[0].name} page?</span>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="search-message-error">
                        The character was not found. Check the name and try again
                    </div>;

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
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </Form>
                {/* <FormikErrMsg component="div" className="search-message-error" name="charName" /> */}
            </Formik>
            <div className="search-message">
                {results}
                {errorMessage}
            </div>
        </div>
    )
}