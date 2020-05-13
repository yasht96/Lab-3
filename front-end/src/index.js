import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
})


ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>, 
document.querySelector('#root'));