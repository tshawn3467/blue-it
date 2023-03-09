import React from "react";


export default function DisplayArticle({ article }) {

    let typeOfArticle = 'image';
    if (article.data.is_video) {
        typeOfArticle = 'video';
    };
    if (article.data.is_self) {
        typeOfArticle = 'self';
    };

    switch (typeOfArticle) {
        case 'image':
            return (
                //-----display article data like reddit article(..ish)-----
                <div>
                    <span className="articleSubAndAuthor">
                        {article.data.subreddit_name_prefixed} : Posted by {article.data.author}
                    </span>
                    <h3>{article.data.title}</h3>
                    <img src={article.data.thumbnail} alt="Not Found" ></img>
                </div>
            );
        case 'self':
            return (
                //-----display article data like reddit article(..ish)-----
                <div>
                    <span className="articleSubAndAuthor">
                        {article.data.subreddit_name_prefixed} : Posted by {article.data.author}
                    </span>
                    <h3>{article.data.title}</h3>
                </div>
            );
        case 'video':
            return (
                /*  Which url for video src? Is there another/original?
                        article.data.media.reddit_video.fallback_url
                        article.data.media.reddit_video.scrubber_media_url
                    Adjust video height/width here or css?
                */
                //-----display article data like reddit article(..ish)-----
                <div>
                    <span className="articleSubAndAuthor">
                        {article.data.subreddit_name_prefixed} : Posted by {article.data.author}
                    </span>
                    <h3>{article.data.title}</h3>
                    <video className="homeArticleVideo" 
                        controls  
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        src={article.data.media.reddit_video.scrubber_media_url}                
                        >
                    
                    </video>
                </div>
            );
        default:
            return (
                <div>
                    Error Loading Article
                </div>
            );
    }
    
}