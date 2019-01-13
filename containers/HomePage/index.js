import React from 'react';
import Wave from '../../components/Wave';
import './index.local.scss';

const renderGithub = () => {
    return (
        <div className='github inline-block link-box'>
            <a href='https://github.com/nave91'>
                <img src='/static/github.png' />
            </a>
        </div>
    );
};

const renderLinkedin = () => {
    return (
        <div className='linkedin inline-block link-box'>
            <a href='https://www.linkedin.com/in/nave91'>
                <img src='/static/linkedin.png' />
            </a>
        </div>
    );
};

const renderNameContainer = () => {
    return (
        <div className='nameContainer'>
            <h1>
                Naveen <br/>
                Kumar <br/>
                Lekkalapudi <br/>
            </h1>
            { renderGithub() }
            { renderLinkedin() }

        </div>
    );
}

const HomePage = () => {
  return (
    <div className='homePageContainer' >
        { renderNameContainer() }
        <Wave />
    </div>
  );
};

export default HomePage