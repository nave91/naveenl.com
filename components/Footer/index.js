import React from 'react';
import './index.local.scss';

const renderPoweredBy = () => {
    return (
        <div className='powered-by'>
            <p>Powered by
                <a href='https://nextjs.org/'>Next.js</a>+
                <a href='https://kubernetes.io/'>K8s</a></p>
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