import React from "react";


export default function Comments({ comment }) {

    return (
        <div className="commentContainer">
            <p className="commentAuthor">
                {comment.data.author}
            </p>
            <div className="commentBodyContainer">
                <p className="commentBody">
                    {comment.data.body}
                </p>
            </div>
        </div>
    )

}