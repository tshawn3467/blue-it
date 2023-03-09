import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadHomeArticles, 
    selectHomeArticles,
    isLoadingHomeArticles,
    failedToLoadHomeArticles
} from "./homeSlice";


export default function Home() {

    const dispatch = useDispatch();
    const article = useSelector(selectHomeArticles);
    const isLoading = useSelector(isLoadingHomeArticles);
    const failedToLoad = useSelector(failedToLoadHomeArticles);

    
    useEffect(() => {
        if (article.length === 0) {
        dispatch(loadHomeArticles());
        }
    }, [dispatch, article.length]);
    


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

    if (article.length === 0) {
        return null;
    }

    return (
        <div className="homeContainer">
            <h1 className="title">
                Home Page
            </h1>
            <div className="previewContainer">
                {article[0].data.title}
            </div>
        </div>
    )
}