import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner"

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <ErrorBoundary>
                                <RandomChar/>
                            </ErrorBoundary>
                            <div className="char__content">
                                <ErrorBoundary>
                                    <CharList onCharSelected={onCharSelected} />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <CharInfo charID={selectedChar} />
                                </ErrorBoundary>
                            </div>
                        </Route>
                        <Route exact path="/comics">
                            <AppBanner/>
                            <ComicsList/>
                        </Route>
                    </Switch>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </Router>
    )
}

export default App;