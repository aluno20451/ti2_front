import React from 'react';
import {getComments, postComment, deleteComment} from './api.js';
import like0 from './images/like_0.png';
import like1 from './images/like_1.png';
//import console = require('console');
import './style.css';

/* 
  Uma nota importante, esta classe é a única com acesso às opções de adicionar ou remover comentários.
*/
class PostsDetails extends React.Component{

    constructor(props) {
        //A invocação do construtor 'super'
        super(props);
    
        this.state = {
          photo: props.post,
          comments: []
        };
    }

    // Vai buscar os comentários do post escolhido, enquanto os comentários não aparecerem mostra o resto da página
    componentDidMount(){
      getComments(this.state.photo.id)
      .then((allComments) => {
        this.setState({comments: allComments});
      })
      .catch((erro) => {
        console.error("Erro ao obter as tarefas", erro);
      });
    }

    // Esta função é precisa para ao apagar um comentário todos os outros sejam recarregados, exceto o último; isto faz-se por alterar o state
    // É necessário fornecer o  id do comentário
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
    
    // Similar à função acima, ao adicionar um comentário, atualiza-se o state de forma ao nosso comentário ser visível
    // Não é preciso fornecer nada pois o texto vai se buscar automaticamente através do id do input type text
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

    // O render cria 2 divs: 1 com a imagem da qual se vê os detalhes, e outro com todas as informações
    // IMPORTANTE: A IMAGEM APARECE COM O SEU TAMANHA ORIGINAL
    render(){
      let postId = this.state.photo.id;
        return React.createElement("div",{id:"PostDetail"},
            React.createElement("img",
                {src:"/api/posts/"+this.state.photo.id+"/image", 
                onClick:() => this.props.handleExitDetails()}
            ),
            React.createElement("div",{style:{padding:50}},
            React.createElement(listaComments,
              {comments: this.state.comments, photo: this.state.photo, isLogged: this.props.isLogged,
                handlePostComments:() => this.handlePostComments(),
                handleDeleteComment:(i) => this.handleDeleteComment(i),
                handleLike: () => this.props.handleLike(postId)
              })
            )

        );
    }
}

/*
  Cria os detalhes do post escolhido; caso os comentários ainda estejam a carregar carrega os restantes detalhes.
  TEM UM BUG: AO FAZER LIKE NÃO ATUALIZA E É PRECISO SAIR E VOLTAR A ENTRAR PRA SE VER
  O mesmo não se verifica com os comments pois são atualizados no state. Foi falta de tempo
*/
function listaComments(props){
  let d = new Date();
  let container=[];
  let date = TimeFormat(props.photo.postedAt);
  let lastCommentIndex = 0;
  
  container.push(React.createElement("h3",{key:-3},"By: "+props.photo.user.name));
  container.push(React.createElement("h4",{key:-2},"On "+date));
  container.push(
    !props.photo.isLiking ? 
    React.createElement("img",{key:-4, src:like0,onClick:() =>  props.handleLike(), style:{width:"20px"}})
    :
    React.createElement("img",{key:-4, src:like1, onClick:() =>  props.handleLike(), style:{width:"20px"}}));
  container.push(React.createElement("span",{key: d.getMilliseconds()}, props.photo.likes))
    container.push(React.createElement("h3",{key:-1},"Comentários:"));
  
  for(let i=0; i<props.comments.length;i++){
    if(props.comments[i].user.isCurrentUser===false){
      container.push(
        React.createElement("p",{key:i},props.comments[i].user.name+": "+props.comments[i].text)
      ); 
    }
    else{
      container.push(React.createElement("div",{key:i},
        React.createElement("span",null,props.comments[i].user.name+": "+props.comments[i].text),
        React.createElement("span",{onClick:() => props.handleDeleteComment(props.comments[i].id)},"❌")  
      )); 
    }
    lastCommentIndex = i;
  }
  
  if(props.isLogged){
    container.push(
      React.createElement("div",{id:"commentDiv",key: lastCommentIndex+1},
        React.createElement("input",{id:"commentText",type:"text"}),
        React.createElement("button",{id:"commentBtn", style:{position:"inherit",height:"25px",width:"50px"},onClick: () => props.handlePostComments()})
      )
    );
  }
  return container;
}

// Função que converte o tempo recebido para tempo normal
function TimeFormat(time) {
  let date1 = new Date(time);
  let format = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  let dateTimeFormat = new Intl.DateTimeFormat("pt-PT", format);
  return dateTimeFormat.format(date1);
}

export default PostsDetails;