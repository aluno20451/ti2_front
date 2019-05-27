import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner';


import {getPosts,login,like,logout} from './api.js';
import PostsItem from './PostsItem.js';
import PostDetails from './PostDetails.js';
import MainBar from './MainBar.js';

/**
 * {
    "UserName": "aluno20451",
    "Name": "João Silva",
    "Password": "58e5aab4",
    "Id": "a365ad91-df6b-4bbb-83cd-6a5d3a5df329"
  }
 */
class IptGram extends React.Component {
  constructor(props) {
    //A invocação do construtor 'super'
    super(props);

    this.state = {
      posts:[],
      isLoading:true,
      post_details:"",
      userLog:false
    };
  }
  
componentDidMount() {
  getPosts("")
    .then((allPosts) => {
      this.setState({posts: allPosts, isLoading:false});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
}

  render(){
    if(this.state.isLoading){
      return React.createElement(Loader,{type:"Puff", color:"#00BFFF", height:"100", width:"100"}); 
    }
    else if(this.state.post_details===""){
      return React.createElement("div",null,
        React.createElement(MainBar,{logged: this.state.userLog,
          handleRefresh: () => this.handleRefresh(),handleSearch:() => this.handleSearch(), handleLogin:() => this.handleLogin()
        },null),
        React.createElement(PostsList,{posts: this.state.posts,
          handlePost: (index) => this.handlePost(index), handleLike: (index) => this.handleLike(index)}));
    }
    else{
      return React.createElement("div",null,
      React.createElement(MainBar,{logged: this.state.userLog,
        handleRefresh: () => this.handleRefresh(), handleSearch:() => this.handleSearch(), handleLogin:() => this.handleLogin()
      },null),
      React.createElement(PostDetails,{post: this.state.post_details,handleExitDetails: () => this.handleExitDetails()}));

    }
  }

  async handleLike(index){
    await like(index)
    .then((resposta) => {
      console.log(resposta);
    });
    getPosts("")
    .then((allPosts) => {
      this.setState({posts: allPosts, isLoading:false});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
  }

  handleLogin(){
    if(!this.state.userLog){
      
      let user = document.getElementById("loginString").value;
      let pass = document.getElementById("passString").value;
    
      let log = {};
      log.userName=user;
      log.password=pass;
  

      login(log)
        .then((resposta) => {
          console.log("Esta a fazer login");
          this.setState({userLog:true});
          getPosts("")
            .then((allPosts) => {
              console.log(allPosts);
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
            console.log(allPosts);
            this.setState({posts: allPosts});
          })
          .catch((erro) => {
            console.error("Erro ao obter as tarefas", erro);
          });
      })
    }
  }

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

  handleRefresh(){
    getPosts("")
    .then((allPosts) => {
      this.setState({posts: allPosts});
    })
    .catch((erro) => {
      console.error("Erro ao obter as tarefas", erro);
    });
  }
  
  handlePost(index){
    let post = this.state.posts[index];
    this.setState({post_details:post});
  }


  handleExitDetails(){
    this.setState({post_details: ""});
  }
}

function PostsList(props){
  let listaPosts = [];
  let d = new Date();
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