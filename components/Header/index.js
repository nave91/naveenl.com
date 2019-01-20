import Link from 'next/link';
import React from 'react';
import './index.local.scss';

const renderHome = () => {
    return (
        <div className='header-box'>
            <Link href='/'>
                <a>
                    <h3>Home</h3>
                </a>
            </Link>
        </div>
    );
};

const renderResumeLink = () => {
    return (
        <div className='header-box'>
            <a href='/static/resume.pdf'>
                <h3>Resume</h3>
            </a>
        </div>
    )
};

const renderBusinessLink = () => {
    return (
        <div className='header-box business-link'>
            <a href='/business'>
                <h3>Gig city</h3>
            </a>
        </div>
    )
};

const Header = () => {
    return (
        <div className='header'>
            { renderHome() }
            { renderResumeLink() }
            { renderBusinessLink() }
        </div>
    );
};

export default Header;