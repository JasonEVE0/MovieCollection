import React from "react";
import axios from "axios";
import AddMovieHeader from "../components/AddMovieHeader";
import Card from "../components/Card"
import "../styles/AddMovie.css"

function AddMovie() {

    const [movies, setMovies] = React.useState([]);

    async function getTop250() {
        await axios.get("/api/top250/")
            .then((res) => {
                let items
                try {
                    items = res.data.items.map((item) => {
                        return item
                    })
                } catch (e) {
                    items = res.data.results.map((item) => {
                        return item
                    })
                }
                setMovies(items);
            })
    }

    async function getSearchMovie(term) {
        await axios.post("/api/searchmovie/", {
            "term": term
        })
            .then((res) => {
                let items = res.data.results.map((movie) => {
                    return movie
                })
                setMovies(items)
            }).catch((err) => {
                console.log(err)
            })
    }


    function searchMovie(evt) {
        evt.preventDefault()
        getSearchMovie(evt.target.search.value);
    }

    React.useEffect(() => {
        getTop250();
    }, [])


    return (
        <div>
            <AddMovieHeader />
            <div className="container">

                <form className="form-inline movieSearch" onSubmit={searchMovie}>
                    <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
                </form>

                <div className="row movieContent">
                    {movies.map((item) => {
                        return <Card
                            key={item['id']}
                            imgurl={item['image']}
                            title={item['title']}
                            year={item['year'] || item['description']}
                            canAdd={true}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddMovie;