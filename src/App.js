import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner';
import './style.css';

import {getPosts,login,like,logout} from './api.js';
import PostsItem from './PostsItem.js';
import PostDetails from './PostDetails.js';
import MainBar from './MainBar.js';


class IptGram extends React.Component {
  constructor(props) {
    //A invocação do construtor 'super'
    super(props);

    this.state = {
      isLoading:true,
      posts:[],
      post_details:"",
      userLog:false
    };
  }

/* 
Executado sempre que a aplicação é aberta pela primeira vez, 
vai tentar fazer logout para não ser possivel a um user fazer login por um outro user se ter esquecido de sair da sua sessao.
Gera um erro caso ninguém tivesse feito login anteriormente, deixei ficar pois não afeta o programa em geral
Vai também buscar pela primeira vez os posts à API disponibilizada.
*/
async componentDidMount() {
  await logout();
  getPosts("")
    .then((allPosts) => {
      this.setState({posts: allPosts, isLoading:false});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
}

  /*Pode returnar 3 coisas:
    1- Se uma atualização estiver a ser feita aos posts retorna uma janela de loading
    2- Mostra todos os posts existentes no state
    3- Mostra um post escolhido pelo utilizador
  */
  render(){
    // 1
    if(this.state.isLoading){
      return React.createElement("div",{ id:"DivLoader"},
        React.createElement(Loader, {type:"Puff", color:"#99FF95", height:"100px", width:"100px"})  
      );
    }
    // 2
    else if(this.state.post_details===""){
      return React.createElement("div",null,
        React.createElement(MainBar,{logged: this.state.userLog,
          handleRefresh: () => this.handleRefresh(),
          handleSearch:() => this.handleSearch(), 
          handleLogin:() => this.handleLogin()
        },null),
        React.createElement(PostsList,{posts: this.state.posts,
          handlePost: (index) => this.handlePost(index), 
          handleLike: (index) => this.handleLike(index)}
        ));
    }
    // 3
    else{
      return React.createElement("div",null,
      React.createElement(MainBar,{logged: this.state.userLog,
        handleRefresh: () => this.handleRefresh(), handleSearch:() => this.handleSearch(), handleLogin:() => this.handleLogin()
      },null),
      React.createElement(PostDetails,{post: this.state.post_details,isLogged: this.state.userLog,
        handleExitDetails: () => this.handleExitDetails(),
        handleLike: (index) => this.handleLike(index)
      }));

    }
  }
  // Faz like e atualiza o state, como o state é atualizado o post "liked" vai ser mostrado como tal
  async handleLike(index){
    if(this.state.userLog){
      await like(index)
      .then((resposta) => {
      });
      
      getPosts("")
      .then((allPosts) => {
        this.setState({posts: allPosts});
      })
      .catch((erro) => {
        console.error("Erro ao obter as tarefas", erro);
      });
    } 
  }

  // Faz o login se o utilizador na aplicação não estiver logged in, se estiver faz logout
  handleLogin(){
    if(!this.state.userLog){
      
      let user = document.getElementById("loginString").value;
      let pass = document.getElementById("passString").value;
    
      let log = {};
      log.userName=user;
      log.password=pass;
  

      login(log)
        .then((resposta) => {
          this.setState({userLog:true});
          getPosts("")
            .then((allPosts) => {
              this.setState({posts: allPosts});
            })
            .catch((erro) => {
              console.error("Erro ao obter as tarefas", erro);
            });
        })
        .catch((erro) => {
          console.error("Erro ao obter as tarefas", erro);
        });
    }
    else{
      logout().then(() => {
        this.setState({userLog:false});
        getPosts("")
          .then((allPosts) => {
            this.setState({posts: allPosts});
          })
          .catch((erro) => {
            console.error("Erro ao obter as tarefas", erro);
          });
      })
    }
  }

// Pesquisa posts por um termo que é adquirido da caixa com id "searchString"
  handleSearch(){
    let texto = document.getElementById("searchString").value;
    
    getPosts(texto)
    .then((allPosts) => {
      this.setState({posts: allPosts});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
  }

  // Busca os posts à API
  async handleRefresh(){
    getPosts("")
    .then((allPosts) => {
      this.setState({posts: allPosts});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
  }
  
  // Guarda no state o indice em que o post escolhido se encontra no array do state, vai gerar uma nova view
  handlePost(index){
    let post = this.state.posts[index];
      this.setState({post_details:post});
  }
  // Retira do state o indice do post escolhido no array, retornado à view com todos os posts
  handleExitDetails(){
    this.setState({post_details: ""});
    getPosts("")
    .then((allPosts) => {
      this.setState({posts: allPosts});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
  }
}

// Função utilizada para mostrar todos os posts, relativamente ao render é usada na opcção 2
function PostsList(props){
  let listaPosts = [];
  let d = new Date();
  // Caso um post esteja a ser procurado por um tema específico, e o post não exista mostra a animação de que está a carregar
  if(props.posts.length===0){
    return React.createElement("div",{id:"DivLoader"},
      React.createElement(Loader, {type:"Puff", color:"#99FF95", height:"100px", width:"100px"})  
   );
  }

  /* Usa os posts que recebe por parâmetro para gerar um Array de PostsItem que vai ser de seguida mostrado num div
    É de notar que o indice do array e não do post vai ser utilizado na função handlePost para selecionar o post que vai ser mostrado na view dos detalhes
  */
  for(let i=0; i<props.posts.length;i++){
      listaPosts.push(
        React.createElement(PostsItem,{key:d.getTime()+i, post: props.posts[i],
          handlePost: () => props.handlePost(i), handleLike: () => props.handleLike(props.posts[i].id)})
      );
  }

  return React.createElement("div",{style:{display:"flex", flexWrap:"wrap",marginTop:"90px"}},
    listaPosts);
}

ReactDOM.render(
  React.createElement(IptGram, null),
  document.getElementById("root")
);

export default IptGram;