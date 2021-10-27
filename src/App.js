import { Provider } from 'react-redux';
import generateStore from './redux/store';
import styled from 'styled-components';
import Home from './containers/Home';

const Wrapper = styled.div`
`;

function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <Wrapper>
        <Home />
      </Wrapper>
    </Provider>
  );
}

export default App;
