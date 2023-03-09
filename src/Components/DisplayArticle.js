import React from "react";


export default function DisplayArticle({ article }) {
    return (
        //-----display article data like reddit article(..ish)-----
        <div>
            <h3>{article.data.title}</h3>
        </div>
    );
}