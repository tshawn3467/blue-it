import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadHomeArticles, 
    selectHomeArticles,
    isLoadingHomeArticles
} from "./homeSlice";


export default function Home() {

    const dispatch = useDispatch();
    dispatch(loadHomeArticles());

    const articles = useSelector(selectHomeArticles);
    const isLoading = useSelector(isLoadingHomeArticles);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    };

    return (
        <div className="homeContainer">
            <h1 className="title">
                Home Page
            </h1>
            <div className="previewContainer">
                {console.log(articles)}
            </div>
        </div>
    )
}