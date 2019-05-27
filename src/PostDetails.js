import React from 'react';
import {getComments} from './api.js';
//import console = require('console');

class PostsDetails extends React.Component{

    constructor(props) {
        //A invocação do construtor 'super'
        super(props);
    
        this.state = {
          photo: props.post,
          comments: []
        };
    }

    componentDidMount(){
      getComments(this.state.photo.id)
      .then((allComments) => {
        this.setState({comments: allComments});
      })
      .catch((erro) => {
        console.error("Erro ao obter as tarefas", erro);
      });
    }

    render(){
      if(this.state.comments.length===0){
        return React.createElement("div",{style:{backgroundColor:"#99FF95",display:"flex",flexDirection:"row",marginTop:"90px"}},
            React.createElement("img",
                {src:"https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+this.state.photo.id+"/image", 
                onClick:() => this.props.handleExitDetails()}
            )
        );
      }
      else{
        return React.createElement("div",{style:{backgroundColor:"#99FF95",display:"flex",flexDirection:"row",marginTop:"90px"}},
            React.createElement("img",
                {src:"https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+this.state.photo.id+"/image", 
                onClick:() => this.props.handleExitDetails()}
            ),
            React.createElement("div",null,React.createElement(listaComments,{comments: this.state.comments,display:"flex"}))
        );
      }    
    }
}

function listaComments(props){
  let container=[];
  container.push(React.createElement("h3",{key:-1},"Comentários:"));
  for(let i=0; i<props.comments.length;i++){
    container.push(React.createElement("p",{key:i},props.comments[i].user.name+": "+props.comments[i].text));
  }
  
  return container;
}

export default PostsDetails;