import React from 'react';
import logo from './images/alumni.png';
import './style.css';

// Esta classe tem três objetivos: ser usada pra ser realizado o login, fazer logout e pesquisa de posts por uma string escrita no input com id "searchString"
class MainBar extends React.Component{
  /*constructor(props) {
    //A invocação do construtor 'super'
    super(props);

  }*/
  
  
  render(){
        return React.createElement("div",{id:"DivMainBar"},
        React.createElement("img",{src:logo, onClick:() => this.props.handleRefresh(),style:{height:"70px"}}),
        
        !this.props.logged ?
        
        React.createElement("div",{id:"Login"},
          React.createElement("p",null,"Login:"),
          React.createElement("input",{type:"text",id:"loginString"}),
          React.createElement("p",null,"Password:"),
          React.createElement("input",{type:"password",id:"passString"}),
          React.createElement("button",{id:"LoginButton",onClick:() => this.props.handleLogin()},"🌲"))
            
            :
        
            React.createElement("div",{id:"Login"},     
          React.createElement("button",{id:"LoginButton",onClick:() => this.props.handleLogin()},"🍂"),
          ),

        React.createElement("div",{},
          React.createElement("input",{onChange:() => this.props.handleSearch(),type:"text",id:"searchString"})
        )
      );
  }
}



export default MainBar;