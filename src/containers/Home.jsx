import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Hero from './components/home/Hero';
import Content from './components/home/Content';
import Modal from './Modal';


const HomeWrapper = styled.div`
	position: relative;
	width: 100%;
`;

function Home() {
	const modalIsShowed = useSelector(store => store.modalReducer.modalIsShowed);

	return (
		<HomeWrapper>
			{
				modalIsShowed && <Modal />
			}
			<Hero />
			<Content />
		</HomeWrapper>
	)
}

export default Home;
