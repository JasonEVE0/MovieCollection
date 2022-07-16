import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../components/Header"
import "../styles/Dashboard.css"
import Card from "../components/Card";

function Dashboard(props) {

    const [movieCollection, setMovieCollection] = useState([]);
    useEffect(() => {
        loadMovies()
    }, [])


    async function loadMovies() {
        await axios.get("/api/addmovie/", {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setMovieCollection(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <Header logout={props.logout} />
            <div className="container">

                {movieCollection.length == 0 ? <h2 className="introMessage">You haven't added any movies yet, click Add new movie to get started!</h2> : null}

                <div className="row movieContent">
                    {movieCollection.map((movie) => {
                        return <Card
                            key={movie['id']}
                            imgurl={movie['image']}
                            title={movie['title']}
                            year={movie['year']}
                            canAdd={false}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;