import React from "react";
import { routes } from "../App/routes";
import { useDispatch } from "react-redux";
import { loadSingleArticle, setSubredditUrlState } from "./displayPageSlice";
import { NavLink } from "react-router-dom";


export default function DisplayArticle({ article }) {

    const dispatch = useDispatch();

    const urlClickedHandler = (e) => {
        dispatch(setSubredditUrlState(e.target.id));
    }

    const articleClickedHandler = () => {
        dispatch(loadSingleArticle(article));
    }
    

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
                           <NavLink id={article.data.subreddit_name_prefixed} to={routes.displayPage()} onClick={urlClickedHandler} > {article.data.subreddit_name_prefixed} </NavLink> : Posted by {article.data.author}
                        </span>
                        <NavLink to={routes.displayPage()} onClick={articleClickedHandler} className='articleLink' >
                            <div className="articleBody">
                                <h3 className="articleTitle">{article.data.title}</h3>
                                {/* logic to determine if article.data.url is .jpg or web url. Web url articles only have thumbnails */}
                                {article.data.url.includes(".jpg") ? 
                                    <div className="imageContainer">
                                        <img className="articleImage" src={article.data.url} alt="Not Found" ></img> 
                                    </div>
                                    : 
                                    <div className="thumbnailContainer">
                                        <img className="articleImage" src={article.data.thumbnail} alt="Not Found" ></img>
                                    </div>
                                }                                
                            </div>
                        </NavLink>
                    </div>
            );
        case 'self':
            return (
                //-----display article with no image or video-----
                
                    <div className="article">
                        <span className="articleSubAndAuthor">
                        <NavLink id={article.data.subreddit_name_prefixed} to={routes.displayPage()} onClick={urlClickedHandler} > {article.data.subreddit_name_prefixed}</NavLink> : Posted by {article.data.author}
                        </span>
                        <NavLink to={routes.displayPage()} onClick={articleClickedHandler} className='articleLink' >
                            <div className="articleBody">
                                <h3 className="articleTitle">{article.data.title}</h3>
                            </div>
                        </NavLink>
                    </div>
            );
        case 'video':
            return (
                //-----display article with video-------
                
                    <div className="article">
                        <span className="articleSubAndAuthor">
                        <NavLink id={article.data.subreddit_name_prefixed} to={routes.displayPage()} onClick={urlClickedHandler} > {article.data.subreddit_name_prefixed}</NavLink> : Posted by {article.data.author}
                        </span>            
                            <div className="articleBody">
                            <NavLink to={routes.displayPage()} onClick={articleClickedHandler} className='articleLink' >
                                <h3 className="articleTitle">{article.data.title}</h3>
                            </NavLink>    
                                <div className="videoContainer">
                                    <video className="articleVideo" 
                                        playsInline                                        
                                        controls  
                                        controlsList="nodownload noremoteplayback"
                                        disablePictureInPicture
                                        src={article.data.media.reddit_video.fallback_url}                
                                    >
                                    
                                    </video>
                                </div>
                            </div>                       
                    </div>
            );
        default:
            return (
                <div className="failedToLoad">
                    Error Loading Article
                </div>
            );
    }
    
}