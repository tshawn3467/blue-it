import React from "react";
import DisplayArticle from "./DisplayArticle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    selectDisplayPageArticles,
    isLoadingDisplayPageArticles,
    failedToLoadDisplayPageArticles,
    loadSubredditArticles,
    selectSubredditUrl
} from './displayPageSlice';


export default function DisplayPage() {

    const dispatch = useDispatch();
    const displayPageArticles = useSelector(selectDisplayPageArticles);
    const isLoading = useSelector(isLoadingDisplayPageArticles);
    const failedToLoad = useSelector(failedToLoadDisplayPageArticles);
    const subredditUrl = useSelector(selectSubredditUrl);

    

    
    useEffect(() => {
        if (displayPageArticles.length === 0) {
        dispatch(loadSubredditArticles(subredditUrl));
        }
    }, [dispatch, displayPageArticles.length, subredditUrl]);
    

    console.log(subredditUrl);
    console.log(displayPageArticles);

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
            {/*-------make div container for titles---------*/}
            <div className="titleContainer" >
                <h1 className="title">
                    Display Page
                </h1>
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