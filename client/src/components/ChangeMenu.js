import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../assets/style/ChangeMenu.scss';
import axios from 'axios';
import * as constants from '../constants/state';
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

export default class ChangeMenu extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Header
          element={this.props.headerElement}
          tocken={this.props.tocken}
        />
        <div>
          메뉴 바꾸는 컴포넌트
          {
            this.props.listData ? <TreeNode node={this.props.listData}/> : null
          }
        </div>
        <Footer/>
      </div>
    )
  }
}


class TreeNode extends React.Component{
  constructor(props){
    super(props);
    this.state = props.node;
  }

  openList = () =>{
    let newState = Object.assign({}, this.state);
    newState.state = this.state.state === 'open' ? 'close' : 'open';
    this.setState(newState);
  }
  
  changeOpenClose = (list) => {
    if(list && list.children && list.children.length > 0){
      return list.state === 'open' ? 'open' : 'close';
    }
  }
  
  render(){
    let list = this.state.children || [];
    let children = list.map((n, idx)=><TreeNode node={n} key={idx}/>);
    if(children.length > 0){
      children = <ul>{children}</ul>
    }
    return (
        <li className={this.changeOpenClose(this.state)}>
          <i className="fa" onClick={this.openList}></i>
          <label onClick={(e)=>{console.log(e.currentTarget)}}>
            {this.state.label}
            {
              this.state.price ?
              <div>
                {this.state.price}
                <button>수정</button>
              </div> : null
            }
          </label>
          {children}
        </li>
      );
  }
}
