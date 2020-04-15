import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getStatusCode(context) {
  if (context && context.res && context.res.statusCode) {
    return context.res.statusCode;
  }

  if (context && context.err && context.err.statusCode) {
    return context.err.statusCode;
  }

  return null;
}

export default class Error extends Component {
  static propTypes = {
    statusCode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  static defaultProps = {
    statusCode: null
  };

  static async getInitialProps(context) {
    return {
      statusCode: getStatusCode(context)
    };
  }

  render5xxMessage = () => `An error ${this.props.statusCode} occurred on server`

  render4xxMessage = () => 'An error occurred on client'

  renderMessage = () => (
    this.props.statusCode
      ? this.render5xxMessage()
      : this.render4xxMessage()
  )

  render() {
    return (
      <p>{ this.renderMessage() }</p>
    );
  }
}