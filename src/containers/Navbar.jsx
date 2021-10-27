import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModalAction, getModalDataAction } from '../redux/modal/modalDuck';
import styled from 'styled-components';
// assets
import { device } from '../assets/styles';

const NavbarContainer = styled.nav`
	position: absolute;
	top: 0;
	z-index: 11;
	display: flex;
	width: 100%;
	height: 50px;
	padding: 0 1em;
	box-sizing: border-box;
`;

const MovieMenu = styled.div`
		display: flex;
		align-items: center;
		width: 20%;
		height: 100%;
		
		//icon
		i {
			color: #fff;
			margin-right: 1em;
		}
		// Link Play
		a {
			color: #fff;
			text-decoration: none;
			margin-right: 1em;

			// MEDIA
			${device.mobileXl} {
				display: none;
			}
		}
		// Link Movies
		div {
			border-left: 1px solid gray;
			color: #fff;
			font-size: .9em;
			padding: .3em 1em;
			
			// MEDIA
			${device.mobileXl} {
				display: none;
			}
		}

			// MEDIA
			${device.mobileXl} {
				width: 5%;
			}
`;
const Searcher = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60%;
		height: 100%;

		// form
		form {
			//border: 1px solid blue;
			width: 80%;
			height: 30px;
		}
		// Input (Movie Name)
		input {
			width: 100%;
			height: 100%;
			border: none;
			text-align: center;
			color: #fff;
			background-color: rgba(255, 255, 255, .2);
		}

		// MEDIA
		${device.mobileXl} {
			width: 75%;
		}
`;
const AccountMenu = styled.div`
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 20%;
		height: 100%;

		// menu
		i {
			color: #fff;
			margin-right: 1em;
		}
		// figure (UserImg)
		figure {
			margin: 0;
			width: 1.5em;
			height: 1.5em;
			min-width: 1.5em;
			min-height: 1.5em;
			box-sizing: border-box;
			border-radius: 50%;
			
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		// MEDIA
		${device.mobileXl} {
			width: 20%;
		}
`;

function Navbar() {
	const dispatch = useDispatch();
	const modalIsShowed = useSelector(store => store.modalReducer.modalIsShowed);

	const [userImg, setUserImg] = useState("");

	const getUserAccount = async () => {
		const res = await axios.get("https://randomuser.me/api/");
		setUserImg(res.data.results[0].picture.thumbnail);
	}

	const inputMovieName = useRef();

	const handleChange = async e => {
		e.preventDefault()
		const movieName = inputMovieName.current.value;
		const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${movieName}`);
		//console.log(res.data);
		const movie = res.data.data.movies ?
									res.data.data.movies[0] :
									{};
		dispatch(getModalDataAction(movie));

		// show modal
		if (inputMovieName.current.value.length === 0) {
			dispatch(showModalAction(false));
		}
		if (inputMovieName.current.value.length >= 1) {
			if (!modalIsShowed) {
				dispatch(showModalAction(true));
			}
		}

	}
	useEffect(() => {
		getUserAccount();
		inputMovieName.current.focus();
	}, [setUserImg])

	return (
		<NavbarContainer>
			<MovieMenu>
				<i className="fas fa-bars"></i>
				<a href="#">Play</a>
				<div>Movies</div>
			</MovieMenu>
			<Searcher>
				<form>
					<input 
						ref={inputMovieName} 
						id="movieName" 
						placeholder="Netflix" 
						onChange={handleChange}
					/>
				</form>
			</Searcher>
			<AccountMenu>
				<i className="fas fa-ellipsis-v"></i>
				<i className="fas fa-bell"></i>
				<figure>
					<img src={userImg} alt="img-account" />
				</figure>
			</AccountMenu>
		</NavbarContainer>
	)
}

export default Navbar;
