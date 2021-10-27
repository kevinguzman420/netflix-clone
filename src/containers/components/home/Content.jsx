import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ListCategory from './subcomponents/ListCategory';

const MainWrapper = styled.div`
	margin: 0;
	padding: 0;
	width: 100%;
	height: auto;
	box-sizing: border-box;
`;

function Content() {
	const [actionList, setActionList] = useState([]);
	const [comedyList, setComedyList] = useState([]);
	const [scifiList, setScifiList] = useState([]);

	const getActionMovies = async () => {
		const res = await axios.get(" https://yts.mx/api/v2/list_movies.json?genre=Action");
		const { movies } = res.data.data;
		setActionList(movies);
	}
	const getComedyMovies = async () => {
		const res = await axios.get(" https://yts.mx/api/v2/list_movies.json?genre=Comedy");
		const { movies } = res.data.data;
		setComedyList(movies);
	}
	const getScifiMovies = async () => {
		const res = await axios.get("https://yts.mx/api/v2/list_movies.json?genre=Sci-fi");
		const { movies } = res.data.data;
		setScifiList(movies);
	}

	useEffect(() => {
		getActionMovies();
		getComedyMovies();
		getScifiMovies();
	}, []);

	return (
		<MainWrapper>
			<ListCategory 
				title="Action"
				numberStream="125 movies"
				movieList={actionList}
			/>
			<ListCategory 
				title="Comedy"
				numberStream="155 movies"
				movieList={comedyList}
			/>
			<ListCategory 
				title="Sci-Fi"
				numberStream="205 movies"
				movieList={scifiList}
			/>
		</MainWrapper>
	);
}

export default Content;
