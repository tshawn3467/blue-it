import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadHomeArticles, 
    selectHomeArticles,
    selectSearchTerm,
    isLoadingHomeArticles,
    failedToLoadHomeArticles,
    loadSearchResults,
    setSearchTermState,
} from "./homeSlice";
import DisplayArticle from "./DisplayArticle";


export default function Home() {

    const dispatch = useDispatch();
    const articles = useSelector(selectHomeArticles);
    const searchTerm = useSelector(selectSearchTerm);
    const isLoading = useSelector(isLoadingHomeArticles);
    const failedToLoad = useSelector(failedToLoadHomeArticles);


    
    useEffect(() => {
        if (articles.length === 0) {
        dispatch(loadHomeArticles());
        }
    }, [dispatch, articles.length]);
    
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

    if (articles.length === 0) {
        return null;
    }

    return (
        <div className="homeContainer">
            <div className="searchBarContainer" >
                <input type='search' placeholder="Search Reddit" className="searchBar" name="q" onChange={ onChangeSearch }  />
                <button className="searchButton" onClick={ onClickSearch }>Search</button>
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