import React, { Component } from 'react';
import '../assets/style/View.scss';
import Header from './Header';
import Footer from './Footer';
import SelectOrder from '../components/SelectOrder';

export default class View extends Component {
  render() {
    return (
      <div>
        <Header element={this.props.headerElement} tocken={this.props.tocken} />
          <SelectOrder tocken={this.props.tocken} listData={this.props.listData}/>
        <Footer />
      </div>
    );
  }
}
