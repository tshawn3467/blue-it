import React from "react";
import DisplayArticle from "./DisplayArticle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    selectDisplayPageArticles,
    isLoadingDisplayPageArticles,
    failedToLoadDisplayPageArticles,
    loadSubredditArticles,
    selectSubredditUrl,
    loadSearchResults,
    selectSearchTerm,
    setSearchTermState
} from './displayPageSlice';


export default function DisplayPage() {

    const dispatch = useDispatch();
    const displayPageArticles = useSelector(selectDisplayPageArticles);
    const isLoading = useSelector(isLoadingDisplayPageArticles);
    const failedToLoad = useSelector(failedToLoadDisplayPageArticles);
    const subredditUrl = useSelector(selectSubredditUrl);
    const searchTerm = useSelector(selectSearchTerm);
    

    
    useEffect(() => {
        if (displayPageArticles.length === 0) {
        dispatch(loadSubredditArticles(subredditUrl));
        }
    }, [dispatch, displayPageArticles.length, subredditUrl]);

    const onClickSearch = () => {
        dispatch(loadSearchResults(searchTerm));
    }

    const onChangeSearch = (e) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTermState(searchTerm));
    }
    

    if (isLoading) {
        return (
            <div className="loading">Loading...</div>
        )
    };

    if (failedToLoad) {
        return (
            <div className="failedToLoad">Something Went Wrong</div>
        )
    };

    
    if (displayPageArticles.length === 0) {
        return null;
    }

    return (
        <div className="displayPageContainer">
            <div className="searchBarContainer" >
                <input type='search' placeholder="Search Reddit" className="searchBar" name="q" onChange={ onChangeSearch }  />
                <button className="searchButton" onClick={ onClickSearch }>Search</button>
            </div>
            <div className="previewContainer">
                
                {displayPageArticles.map(article => {
                    return (
                        <div key={article.data.id} className="articleContainer">
                            <DisplayArticle article={article} />
                        </div>
                    )
                })}
                
            </div>
            
        </div>
    )
}