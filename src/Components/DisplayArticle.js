import React from "react";


export default function DisplayArticle({ article }) {

    let typeOfArticle = 'image';
    if (article.data.is_video) {
        typeOfArticle = 'video';
    };
    if (article.data.is_self || article.data.thumbnail === 'default') {
        typeOfArticle = 'self';
    };

    switch (typeOfArticle) {
        case 'image':
            return (
                /*
                    article.data.preview.images[0].source.url
                        ^-Doesn't workdue to 403 access forbidden
                    article.data.thumbnail
                        ^-Small probably used for smaller screen res
                        ^-Bad res when made larger
                    
                    
                */
                //-----display article with image-----
                <div className="article">
                    <span className="articleSubAndAuthor">
                        {article.data.subreddit_name_prefixed} : Posted by {article.data.author}
                    </span>
                    <h3 className="articleTitle">{article.data.title}</h3>
                    <img className="articleImage" src={article.data.thumbnail} alt="Not Found" ></img>
                    
                </div>
            );
        case 'self':
            return (
                //-----display article with no image or video-----
                <div className="article">
                    <span className="articleSubAndAuthor">
                        {article.data.subreddit_name_prefixed} : Posted by {article.data.author}
                    </span>
                    <h3 className="articleTitle">{article.data.title}</h3>
                </div>
            );
        case 'video':
            return (
                /* 

                */
                //-----display article with video-------
                <div className="article">
                    <span className="articleSubAndAuthor">
                        {article.data.subreddit_name_prefixed} : Posted by {article.data.author}
                    </span>
                    <h3 className="articleTitle">{article.data.title}</h3>
                    <video className="articleVideo" 
                        controls  
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        src={article.data.media.reddit_video.fallback_url}                
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