import React from 'react';
import {getComments, postComment, deleteComment} from './api.js';
//import console = require('console');
import './style.css';

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

     handleDeleteComment(id){
      deleteComment(id)
        .then((resposta) => {
          getComments(this.state.photo.id)
          .then((allComments) => {
            this.setState({comments: allComments});
          })
        .catch((erro) => {
          console.error("Erro ao obter as tarefas", erro);
        });
      })
      .catch((erro) => {
        console.error("Isto tá a dar erro e não sei porque", erro);
      });
    }

    handlePostComments(){
      let pId = this.state.photo.id;
      let comment = document.getElementById("commentText").value;
      let content = {};
      content.postId = pId;
      content.text = comment;

      postComment(content)
      .then((allComments) => {
        getComments(this.state.photo.id)
        .then((allComments) => {
          this.setState({comments: allComments});
        })
        .catch((erro) => {
          console.error("Erro ao obter as tarefas", erro);
        });
        
      })
      .catch((erro) => {
        console.error("Erro ao obter as tarefas", erro);
      });

    }

    render(){
        return React.createElement("div",{id:"PostDetail"},
            React.createElement("img",
                {src:"/api/posts/"+this.state.photo.id+"/image", 
                onClick:() => this.props.handleExitDetails()}
            ),
            this.state.comments===0 ?
              null
            :
            React.createElement("div",{style:{padding:50}},React.createElement(listaComments,
              {comments: this.state.comments, isLogged: this.props.isLogged,
                handlePostComments:() => this.handlePostComments(),
                handleDeleteComment:(i) => this.handleDeleteComment(i)
              }))

        );
    }
}

function listaComments(props){
  let container=[];
  let lastCommentIndex = 0;
  container.push(React.createElement("h3",{key:-1},"Comentários:"));
  for(let i=0; i<props.comments.length;i++){
    if(props.comments[i].user.isCurrentUser===false){
      container.push(
        React.createElement("p",{key:i},props.comments[i].user.name+": "+props.comments[i].text)
      ); 
    }
    else{
      container.push(React.createElement("div",{key:i},
        React.createElement("p",null,props.comments[i].user.name+": "+props.comments[i].text),
        React.createElement("span",{onClick:() => props.handleDeleteComment(props.comments[i].id)},"❌")  
      )); 
    }
    lastCommentIndex = i;
  }
  
  if(props.isLogged){
    container.push(
      React.createElement("div",{key: lastCommentIndex+1},
        React.createElement("input",{id:"commentText",type:"text"}),
        React.createElement("button",{id:"commentBtn", style:{position:"inherit",height:"25px",width:"50px"},onClick: () => props.handlePostComments()})
      )
    );
  }
  return container;
}

export default PostsDetails;