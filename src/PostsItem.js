import React from 'react';
import like0 from './images/like_0.png';
import like1 from './images/like_1.png';
import './style.css';

// É uma classe bastante simples mas a mais importante de todas; mostra o post em tamanha diminuido standard, mostra também o numero de likes, comentários e quem a publicou
class PostsItem extends React.Component{

  constructor(props) {
      //A invocação do construtor 'super'
      super(props);
    
      this.state = {
       post: props.post
      };
  }

    render(){
      let date = TimeFormat(this.state.post.postedAt);

      return React.createElement("div",{className:"PostsDiv"},
          React.createElement("p",{style:{height:"20px",textAlign:"center", fontStyle:"italic"}}, this.state.post.caption),
          React.createElement("div",{className:"DivImg"},
            React.createElement("img",{className:"PostsImg",src:"/api/posts/"+this.state.post.id+"/image", 
            onClick:() =>this.props.handlePost()})
          ),
          React.createElement("p",null,"By: "+this.state.post.user.name+" on "+date),
          
          !this.state.post.isLiking ? 
          React.createElement("img",{src:like0,onClick:() => this.props.handleLike(), style:{width:"20px"}})
          :
          React.createElement("img",{src:like1, onClick:() => this.props.handleLike(), style:{width:"20px"}})
          ,
          
          React.createElement("span",null, this.state.post.likes+"💬"+this.state.post.comments)
        )       
    }
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




export default PostsItem;