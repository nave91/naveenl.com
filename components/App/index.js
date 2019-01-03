import React from 'react';
import Header from "../Header";

import './index.scss';

const App = ({ children }) => (
    <main>
        <Header/>
        {children}
    </main>
);

export default App;