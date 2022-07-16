import React from "react"
import axios from "axios"
import "../styles/Card.css"

function Card(props){

    const addItemListener = async() => {
        // if the movie card is on the dashboard, this axios request won't happen
        if (!props.canAdd){
            return;
        }
        
        await axios.post("/api/addmovie/", {
            title: props.title,
            image: props.imgurl,
            year: props.year
        },
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            alert("Movie added to collection.")
        }).catch((err) => {
            alert("Error adding movie to collection.")
        })
    }

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 card" key={Math.random()} onClick={addItemListener}>
            <img src={props.imgurl}></img>
            <div className="cardInfo">
                <h2>{props.title}</h2>
                <h3>{props.year}</h3>
            </div>
        </div>
    )
}

export default Card;