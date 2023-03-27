import React from "react";
import DisplayArticle from "./DisplayArticle";
import Comments from "./Comments";
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
    setSearchTermState,
    loadComments,
    selectComments,
    selectCommentsUrl
} from './displayPageSlice';


export default function DisplayPage() {

    const dispatch = useDispatch();
    const displayPageArticles = useSelector(selectDisplayPageArticles);
    const isLoading = useSelector(isLoadingDisplayPageArticles);
    const failedToLoad = useSelector(failedToLoadDisplayPageArticles);
    const subredditUrl = useSelector(selectSubredditUrl);
    const searchTerm = useSelector(selectSearchTerm);
    const comments = useSelector(selectComments);
    const commentsUrl = useSelector(selectCommentsUrl);
    

    
    useEffect(() => {
        if (displayPageArticles.length === 0) {
            dispatch(loadSubredditArticles(subredditUrl));
        }
        if (displayPageArticles.length === 1) {
            dispatch(loadComments(commentsUrl));
        }
    }, [dispatch, displayPageArticles.length, subredditUrl, commentsUrl]);

    const onClickSearch = () => {
        dispatch(loadSearchResults(searchTerm));
    }

    const onChangeSearch = (e) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTermState(searchTerm));
    }
    

    if (isLoading) {
        return (
            <div className="loading">
                <h1>
                    Loading...
                </h1>
            </div>
        )
    };

    if (failedToLoad) {
        return (
            <div className="failedToLoad">
                <h1>
                    Something Went Wrong
                </h1>
            </div>
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
            
            <div className="commentsSectionContainer">
                <div className="commentsTitle">
                    <h2>
                        Comments:
                    </h2>
                </div>
                {displayPageArticles.length === 1 ? ( 
                        comments.map(comment => {
                            return (
                                <div key={comment.data.id} className="commentContainer">
                                    <Comments comment={comment} />
                                </div> 
                            )
                        })                        
                    ) : (null)
                }
            </div>
        </div>
    )
}