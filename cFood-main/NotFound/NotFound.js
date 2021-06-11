import React from "react";
import "./NotFound.css";

export default function NotFound() {
    /* This function displays an error message whenever the user navigates to a route that does not exist */
    return (
        <div className="NotFound text-center">
            <h3>Sorry, page not found!</h3>
        </div>
    );
}
