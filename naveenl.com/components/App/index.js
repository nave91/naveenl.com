import React from 'react';

import Head from '../Head';
import Header from '../Header';
import Footer from '../Footer';

import './index.scss';

const App = ({ children }) => (
    <main>
        <Head/>
        <Header />
        {children}
        <Footer />
    </main>
);

export default App;