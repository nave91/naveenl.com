import React from 'react';
import './index.local.scss';

const renderGithub = () => {
    return (
        <div className='github inline-block'>
            <a href='https://github.com/nave91'>
                <img src='/static/github.png' />
            </a>
        </div>
    );
};

const renderLinkedin = () => {
    return (
        <div className='linkedin inline-block'>
            <a href='https://www.linkedin.com/in/nave91'>
                <img src='/static/linkedin.png' />
            </a>
        </div>
    );
};

const Footer = () => {
    return (
        <div className='footer'>
            { renderGithub() }
            { renderLinkedin() }
        </div>
    );
};

export default Footer;