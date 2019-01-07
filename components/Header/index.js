import Link from 'next/link';
import React from 'react';
import './index.local.scss';

const Header = () => {
    return (
        <div className='header'>
            <div className='home'>
                <Link href='/'>
                    <a>
                        <h3>Home</h3>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Header;