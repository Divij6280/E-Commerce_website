import React from "react";
import Hero from "../components/hero/hero";
import Popular from "../components/popular/popular";
import Offers from "../components/offers/offers";
import NewCollections from "../components/NewCollections/NewCollections";
import FeedBack from "../components/FeedBack/Feedback";



const Shop=()=>{
    return(
        <div>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
            <FeedBack/>
        </div>
    )
}
export default Shop