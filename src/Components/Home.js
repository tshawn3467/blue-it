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

    /*-------fix to implement dispatch(loadHomeArticles)
    useEffect(() => {
        if (article)
    }, [dispatch]);
    */

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

    return (
        <div className="homeContainer">
            <h1 className="title">
                Home Page
            </h1>
            <div className="previewContainer">
                {console.log(article)}
            </div>
        </div>
    )
}