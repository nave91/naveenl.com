import Link from 'next/link';
import React from 'react';
import './index.local.scss';

const Header = () => {
    return (
        <div className='header'>
            <Link href='/'>
                <a>Home</a>
            </Link>
        </div>
    );
};

export default Header;