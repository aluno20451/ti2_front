import React from 'react';
import like0 from './images/like_0.png';
import like1 from './images/like_1.png';
import './style.css';
class PostsItem extends React.Component{

  constructor(props) {
      //A invocação do construtor 'super'
      super(props);
    
      this.state = {
       post: props.post
      };
  }

    render(){
      return React.createElement("div",{className:"PostsDiv"},
          React.createElement("p",{style:{height:"20px",textAlign:"center", fontStyle:"italic"}}, this.state.post.caption),
          React.createElement("div",{className:"DivImg"},
            React.createElement("img",{className:"PostsImg",src:"/api/posts/"+this.state.post.id+"/image", 
            onClick:() =>this.props.handlePost()})
          ),
          React.createElement("p",null,"By: "+this.state.post.user.name),
          
          !this.state.post.isLiking ? 
          React.createElement("img",{src:like0,onClick:() => this.props.handleLike(), style:{width:"20px"}})
          :
          React.createElement("img",{src:like1, onClick:() => this.props.handleLike(), style:{width:"20px"}})
          ,
          
          React.createElement("span",null, this.state.post.likes+"💬"+this.state.post.comments)
        )       
    }
}

export default PostsItem;