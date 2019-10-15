import uniqueId from 'lodash/uniqueId';
import React, {useState, Component} from 'react';
import Sortable from 'react-sortablejs';
import ReactDOM from 'react-dom';
 
// Functional Component
const SharedGroup = ({ items }) => {
    items = items.map(val => (<li key={uniqueId()} data-id={val}>{val}</li>));
 
    return (
        <Sortable
            // See all Sortable options at https://github.com/RubaXa/Sortable#options
            options={{
              group: {
                name: 'shared',
                pull: 'clone',
                put: false,
                // put: false // Do not allow items to be put into this list
            },
            disabled: false,
                // group: 'shared'
            }}
            tag="ul"
        >
            {items}
        </Sortable>
    );
};

const SharedGroup2 = ({ items }) => {
  items = items.map(val => (<li key={uniqueId()} data-id={val}>{val}</li>));

  return (
      <Sortable
          // See all Sortable options at https://github.com/RubaXa/Sortable#options
          options={{
            group: {
              
              name: 'shared',
              // pull: 'clone',
              // put: false // Do not allow items to be put into this list
          },
              // group: 'shared'
          }}
          tag="ul"
      >
          {items}
      </Sortable>
  );
};
 
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wall : ['벽']
    };
  }

  plusWall = () => {
    this.setState({wall : this.state.wall.push('벽추가')})
  }
  render(){
    return(
      <div>
            {/* <SharedGroup
                items={this.state.wall}
            /> */}
            <button onClick={this.plusWall}>벽추가</button>
            <br/>
            <SharedGroup2
                items={['Lemon', 'Orange', 'Pear', 'Peach']}
            />

        </div>
    )
  }
};
 
ReactDOM.render(<App />, document.getElementById('root'));