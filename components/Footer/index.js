import React from 'react';
import './index.local.scss';

const renderPoweredBy = () => {
    return (
        <div className='powered-by'>
            <p>Powered by
                <a href='https://nextjs.org/'>Next.js</a>+
                <a href='https://www.docker.com/'>Docker</a></p>
        </div>
    );
};

const Footer = () => {
    return (
        <div className='footer'>
            { renderPoweredBy() }
        </div>
    );
};

export default Footer;