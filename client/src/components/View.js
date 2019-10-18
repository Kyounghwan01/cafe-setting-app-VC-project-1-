import React, { Component } from 'react';
import '../assets/style/View.scss';
import Header from './Header';
import Footer from './Footer';
import { TiShoppingCart } from 'react-icons/ti';
import SelectSeat from '../components/SelectSeat';
import SelectMenu from '../components/SelectMenu';

export default class View extends Component {
  render() {
    return (
      <div>
        <div className="shopping-cart">
          <TiShoppingCart size="50" />
        </div>
        <Header element={this.props.headerElement} tocken={this.props.tocken} />
        <div className="view-container">
          <SelectSeat tocken={this.props.tocken} />
          <SelectMenu
            tocken={this.props.tocken}
            listData={this.props.listData}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
