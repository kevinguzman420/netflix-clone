import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showModalAction } from '../redux/modal/modalDuck';

import { device } from '../assets/styles';

const ModalContainer = styled.div`
	position: fixed;
	top: 0px; right: 0; bottom: 0; left: 0; 
	z-index: 10;
	background-color: #171717;
	opacity: .95;
	width: 100vw;
	height: calc(100vh);

	.btnClose {
		margin: .5em;
		margin-top: 2em;
		color: red;
		font-size: 1.5em;
		cursor: pointer;
	}
`;
const MovieContainer = styled.div`
	margin: 0 auto;
	width: 80%;
	height: auto; 
	overflow-y: auto;
	display: ${props => props.thereIsMovie
	? 
			`
			grid;
			grid-template-columns: auto 400px;
			grid-template-rows: 350px;
			grid-template-areas: "cover info";
			grid-gap: 2em;
			align-content: center;
	`
			:
			`flex;
			align-items: center;`
	}
	justify-content: center;

	// MEDIA
	${device.tablet} {
		width: 90%;
	}
	${device.mobileL} {
			display: grid;
			grid-template-columns: auto;
			grid-template-rows: 300px auto;
			grid-template-areas: "cover" "info";
			grid-gap: 2em;
			align-content: center;
	}
`;
const Cover = styled.figure`
	grid-area: cover;
	margin: 0;
	padding-right: 3em;
	width: 100%;
	height: 100%;
	text-align: end;

	// MEDIA
	${device.mobileXl} {
		padding-right: 1em;
	}
	${device.mobileL} {
		text-align: center;
		width: auto;

		img {
		width: auto;
		height: 100%;
		}
	}
`;
const InfoWrapper = styled.div`
	grid-area: info;
	margin: 0;
	width: 100%;
	height: 100%;
	color: #fff;

	small {
		display: block;
	}
	.title {
		margin: 0;
		margin-bottom: 1em;
	}
	.description {
		margin: .5em 0;
		margin-bottom: 1em;
		max-height: 150px;
		overflow-y: auto;
	}
	.year {
		margin: .5em 0;
		font-weight: bold;
	}
	.rating {
		display: flex;
		margin: .5em 0;
	
		p {
			margin: 0;
			margin-left: .5em;
		}
	}
`;
const InfoSearcher = styled.p`
	color: white;
	font-size: 3em;
`;

function Modal() {
	const dispatch = useDispatch();
	const modalData = useSelector(store => store.modalReducer.modalData);

	const thereIsMovie = modalData.id !== undefined ? true : false;

	const closeModal = () => {
		dispatch(showModalAction(false));
	}

	return (
		<ModalContainer thereIsMovie={thereIsMovie}>
			<i 
				className="fas fa-times btnClose"
				onClick={() => closeModal()}
			></i>
			{
				thereIsMovie  
					?
						<MovieContainer>
							<Cover>
								<img src={modalData.medium_cover_image} alt="" />
							</Cover>
							<InfoWrapper>
								<small>Title:</small>
								<h2 className="title">{modalData.title}</h2>
								<small>Description:</small>
								<p className="description">{modalData.summary}</p>
								<small>Year:</small>
								<p className="year">{modalData.year}</p>
								<small>Rating:</small>
								<div className="rating">
									<i className="fas fa-star"></i>
									<p>{modalData.rating}</p>
								</div>
							</InfoWrapper>
						</MovieContainer>
					:
					<InfoSearcher>There is no movies with this name</InfoSearcher>
			}
		</ModalContainer>
	);
}

export default Modal;
