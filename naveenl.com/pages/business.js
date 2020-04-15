import React from 'react';

import Business, {renderToDOM} from '../containers/Business';
import Head from '../components/Head'


const businessPage = () => (
    <div>
        <Head />
        <Business />
    </div>
);

export default businessPage;