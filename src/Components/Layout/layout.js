import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';
import './styles.scss';

export class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <div className="sidebar">
            <div className="logo-container">
                <img src=""/>
                <p className="title" >Pizza Live</p>
                <p className="description">Best Pizza in the town</p>
            </div>
            <hr/>
            <div className="left-menu">
                <div className="menu-item">
                  <div className="bg-black color-white">Menu</div>
                  <div className="bg-orange color-white"><Icon name="arrow right" size="large" color="green" /></div>
                </div>
            </div>
        </div>
        <div className="content-section">
          {this.props.children}
        </div>

      </div>
    )
  }
}

export default Layout
