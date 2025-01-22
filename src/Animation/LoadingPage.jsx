import React from 'react'
import "./loading.scss";
export default function LoadingPage() {
    return(
        <>
           <div className="ShoppeLoading">
            <div style={{"--delay":"1s"}}></div>
            <div style={{"--delay":"2s"}}></div>
            <div style={{"--delay":"3s"}}></div>
           </div>
        </>
    )
}
