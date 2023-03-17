import React from "react";
import DisplayArticle from "./DisplayArticle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    selectdisplayPageArticles,
    isLoadingDisplayPageArticles,
    failedToLoadDisplayPageArticles,
    loadDisplayPageArticles
} from './displayPageSlice';


export default function DisplayPage() {

    const dispatch = useDispatch();
    const articles = useSelector(selectdisplayPageArticles);
    const isLoading = useSelector(isLoadingDisplayPageArticles);
    const failedToLoad = useSelector(failedToLoadDisplayPageArticles);


    

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

    if (articles.length === 0) {
        return null;
    }

    return (
        <div className="displayPageContainer">
            {/*-------make div container for titles---------*/}
            <div className="titleContainer" >
                <h1 className="title">
                    Home Page/SearchBar?
                </h1>
            </div>
            <div className="previewContainer">
                {articles.map(article => {
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