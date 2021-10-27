import styled from 'styled-components';
import heroImg from '../../../media/heroImg.jpg';
import netflixImg from '../../../media/Logo-Netflix.png';
import Navbar from '../../Navbar';

// assets
import { device } from '../../../assets/styles';


const HeroWrapper = styled.div`
	//position: relative;
	width: 100%;
	height: 100vh;
	background-image: url(${heroImg});
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	align-items: end;

	div {
		z-index: 2;
	}
`;
const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 350px;
	color: white;

	figure {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #fff;

		img {
			width: 70%;
			height: 40%;
		}
	}
	.netflix {
		margin: 0;
		text-transform: uppercase;
		font-size: 2em;
	}
	.info-netflix {
		p {
			display: inline-block;
			margin: 0 .5em;
			font-size: .8em;
		}
	}
	.info-description {
		width: 50%;
		text-align: center;
		font-size: .9em;

		// MEDIA
		${device.tablet} {
			width: 80%;
		}
	}
	.info-btn-action {
		a {
			margin: 0 .5em;
			padding: .5em 1em;
			font-size: .8em;
			color: #fff;
			text-decoration: none;
		}
		.btn-buy {
			background-color: #d50000;
		}
		.btn-menu {
			background-color: rgba(255, 255, 255, .3);
		}
	}
`;

function Hero() {
	return (
		<HeroWrapper>
				<Navbar />
				<InfoWrapper>
					<figure>
						<img src={netflixImg} alt="netflix logo" />
					</figure>
					<p className="netflix">netflix</p>
					<div className="info-netflix">
						<p>Movies</p>
						<p>TV Shows</p>
					</div>
					<p className="info-description">
						Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more. Start your free trial today.
					</p>
					<div className="info-btn-action">
						<a className="btn-buy" href="#">buy $7.56</a>
						<a className="btn-menu" href="#"><i className="fas fa-ellipsis-h"></i></a>
					</div>
				</InfoWrapper>
		</HeroWrapper>
	)
}

export default Hero;
