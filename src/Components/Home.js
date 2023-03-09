import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadHomeArticles, 
    selectHomeArticles,
    isLoadingHomeArticles,
    failedToLoadHomeArticles
} from "./homeSlice";
import DisplayArticle from "./DisplayArticle";


export default function Home() {

    const dispatch = useDispatch();
    const articles = useSelector(selectHomeArticles);
    const isLoading = useSelector(isLoadingHomeArticles);
    const failedToLoad = useSelector(failedToLoadHomeArticles);

    
    useEffect(() => {
        if (articles.length === 0) {
        dispatch(loadHomeArticles());
        }
    }, [dispatch, articles.length]);
    


    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    };

    if (failedToLoad) {
        return (
            <div>Something Went Wrong</div>
        )
    };

    if (articles.length === 0) {
        return null;
    }

    return (
        <div className="homeContainer">
            <h1 className="title">
                Home Page
            </h1>
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