import React from 'react';
import {Container} from 'react-bootstrap';

import KeywordManager from './components/KeywordManager';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Container fluid={true}>
        <KeywordManager />
    </Container>
  );
}

export default App;
