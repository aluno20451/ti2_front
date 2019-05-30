import React from 'react';
import logo from './images/alumni.png';

class MainBar extends React.Component{
  constructor(props) {
    //A invocação do construtor 'super'
    super(props);

  }
  
  
  render(){
    if(!this.props.logged){
        return React.createElement("div",{style:{backgroundColor:"#ddd" ,height:"70px", top:"0",width:"100%",border:"2px solid #B0B0B0", position:"fixed", display:"flex",flexDirection:"row", justifyContent: 'space-between', alignItems:"center"}},
        React.createElement("img",{src:logo, onClick:() => this.props.handleRefresh(),style:{height:"70px"}}),
        React.createElement("div",{style:{display:"flex",alignItems:"center"}},
          
          React.createElement("p",null,"Login:"),
          React.createElement("input",{type:"text",id:"loginString"}),
          React.createElement("p",null,"Password:"),
          React.createElement("input",{type:"password",id:"passString"}),
          React.createElement("button",{onClick:() => this.props.handleLogin(), 
            style:{position:"inherit", height:"25px", width:"50px"}},"🌲"),
        
        ),
          
        React.createElement("div",{},
          React.createElement("input",{onChange:() => this.props.handleSearch(),type:"text",id:"searchString", style:{position:"inherit", height:"20px"}})
        )
      );
    }
    else{
      return React.createElement("div",{style:{backgroundColor:"#ddd" ,height:"70px",  top:"0",width:"100%", border:"2px solid #B0B0B0", position:"fixed", display:"flex",flexDirection:"row", justifyContent: 'space-between', alignItems:"center"}},
        React.createElement("img",{src:logo, onClick:() => this.props.handleRefresh(),style:{height:"70px"}}),
        React.createElement("div",{style:{display:"flex",alignItems:"center"}},
          
          React.createElement("button",{onClick:() => this.props.handleLogin(), 
            style:{position:"inherit", height:"25px", width:"50px"}},"🍂"),
        
        ),
          
        React.createElement("div",{},
          React.createElement("input",{onChange:() => this.props.handleSearch(),type:"text",id:"searchString", style:{position:"inherit", height:"20px"}})
        )
      );
    }
  }
}

export default MainBar;