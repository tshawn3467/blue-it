import React from "react";
import { routes } from "../App/routes";
import { useDispatch } from "react-redux";
import { setSubredditUrlState } from "./displayPageSlice";
import { NavLink } from "react-router-dom";


export default function DisplayArticle({ article }) {

    const dispatch = useDispatch();

    const urlClickedHandler = (e) => {
        dispatch(setSubredditUrlState(e.target.id));
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
                        <a href={`https://www.reddit.com${article.data.permalink}`} className='articleLink' >
                            <div>
                                <h3 className="articleTitle">{article.data.title}</h3>
                                <img className="articleImage" src={article.data.thumbnail} alt="Not Found" ></img>
                            </div>
                        </a>
                        <div className='articleWhitespaceBottom' >
                                {/* style for whitespace so looks more appealing */}
                        </div>
                    </div>
            );
        case 'self':
            return (
                //-----display article with no image or video-----
                
                    <div className="article">
                        <span className="articleSubAndAuthor">
                        <NavLink id={article.data.subreddit_name_prefixed} to={routes.displayPage()} onClick={urlClickedHandler} > {article.data.subreddit_name_prefixed}</NavLink> : Posted by {article.data.author}
                        </span>
                        <a href={article.data.url} className='articleLink' >
                            <div>
                                <h3 className="articleTitle">{article.data.title}</h3>
                            </div>
                            <div className='articleWhitespaceBottom' >
                                {/* style for whitespace so looks more appealing */}
                            </div>
                        </a>
                    </div>
            );
        case 'video':
            return (
                //-----display article with video-------
                
                    <div className="article">
                        <span className="articleSubAndAuthor">
                        <NavLink id={article.data.subreddit_name_prefixed} to={routes.displayPage()} onClick={urlClickedHandler} > {article.data.subreddit_name_prefixed}</NavLink> : Posted by {article.data.author}
                        </span>            
                            <div>
                            <a href={article.data.url} className='articleLink' >
                                <h3 className="articleTitle">{article.data.title}</h3>
                            </a>    
                                <video className="articleVideo" 
                                    playsInline
                                    
                                    controls  
                                    controlsList="nodownload noremoteplayback"
                                    disablePictureInPicture
                                    src={article.data.media.reddit_video.fallback_url}                
                                >
                                
                                </video>
                            </div>  
                            <div className='articleWhitespaceBottom' >
                                {/* style for whitespace so looks more appealing */}
                            </div>                      
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