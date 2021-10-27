import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { showModalAction, getModalDataAction } from '../../../../redux/modal/modalDuck';
import { useEffect, useState } from 'react';

const ListCategoryWrapper = styled.div`
    margin: 0 auto;
    margin-bottom: 5em;
    width: 80%;
    height: 350px;
    color: #fff;
`;
const CategoryHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 35px;
	background-color: transparent;
	box-sizing: border-box;

	.category-name {
		p {
        margin: 0;
        //color: rgba(255, 255, 255, .3); 
		}
	}
  .category-controls {
    button {
        padding: .4em .6em;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, .3);
        text-transform: uppercase;
        font-size: .7em;
        color: #fff; 
        transition: .3s all;

        &:hover {
            cursor: pointer;
            background-color: red;
        }
    }
  }
`;
const CategoryList = styled.div`
    display: flex;
    margin-top: .5em; 
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    
    .movie-container {
        margin: 0;
        margin-right: 1em;
        padding: 0;
        width: auto;
        background-color: #240000;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;

        img {
            height: 65%;
        }
        .movie-description {
           height: 35%;
           padding: .5em;

            .title-movie {
                margin: 0;
                margin-bottom: .5em;
                width: 90px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            small {
                color: rgba(255, 255, 255, .5);
            }
        }
    }
    .rating-price {
        display: flex;
        justify-content: space-between;
        margin-top: 1em;

        .rating {
            display: flex;
            color: rgba(255, 255, 255, .5); 
            i {
                margin-right: .8em;
                font-size: .7em;
            }
            p {
                margin: 0;
                font-size: .8em;
            }
        }
        .price {
            margin: 0;
            font-size: .8em;
        }
    }
`;


let pageCountAction = 1;
let pageCountComedy = 1;
let pageCountScifi = 1;
function ListCategory({title, numberStream, movieList}) {
    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);

    const incDecMoviesCount = (action, category) => {
        if (action === "PREV") {
            switch(category) {
                case "Action":
                    pageCountAction > 1 && pageCountAction--;
                    break;
                case "Comedy":
                    pageCountComedy > 1 && pageCountComedy--;
                    break;
                default: // Scifi
                    pageCountScifi > 1 && pageCountScifi--;
                    break;
            }
        } else if (action === "NEXT") {
            switch(category) {
                case "Action":
                    pageCountAction++;
                    break;
                case "Comedy":
                    pageCountComedy++;
                    break;
                default: // Scifi
                    pageCountScifi++;
                    break;
            }
        }
    }
    const getNewMovies = async (btnName) => {
        let res = [];
        switch(title) {
            case "Action":
                incDecMoviesCount(btnName, "Action"); 
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=7&page=${pageCountAction}&genre=Action`); 
                setMovies(res.data.data.movies);
                break;
            case "Comedy":
                incDecMoviesCount(btnName, "Comedy"); 
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=7&page=${pageCountComedy}&genre=Comedy`); 
                setMovies(res.data.data.movies);
                break;
            default: // "Sci-fi":
                incDecMoviesCount(btnName, "Sci-fi"); 
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=7&page=${pageCountScifi}&genre=Sci-fi`); 
                setMovies(res.data.data.movies);
                break;
       }
    }
    
    const showMovie = (movie) => {
        dispatch(getModalDataAction(movie));
        dispatch(showModalAction(true));
    }

    useEffect(() => {
        if (movies.length === 0) {
            setMovies(movieList);
        } 
    }, [movies, movieList]);

    return (
        <ListCategoryWrapper>
            <CategoryHeader>
                <div className="category-name">
                    <p>{title}</p>
                    <small>{numberStream}</small>
                </div>

                <div className="category-controls">
                    <button 
                        onClick={() => getNewMovies("PREV")}
                    ><i className="fas fa-angle-left"></i></button>
                    <button 
                        onClick={() => getNewMovies("NEXT")}
                    ><i className="fas fa-angle-right"></i></button>
                </div>
            </CategoryHeader>
            <CategoryList>
                {
                    movies.map(movie => (
                        <figure 
                            className="movie-container" 
                            onClick={() => showMovie(movie)}
                            key={movie.id}
                        >
                            <img src={movie.large_cover_image} alt="" />
                            <div className="movie-description">
                                <p className="title-movie" title={movie.title}>{movie.title}</p>
                                <small>{movie.genres[0]}</small>
                                <div className="rating-price">
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <p>9</p>
                                    </div>
                                    <p className="price">$ 10.23</p>
                                </div>
                            </div>
                        </figure>
                    ))
                }
            </CategoryList>
        </ListCategoryWrapper>
    );
}

export default ListCategory;
