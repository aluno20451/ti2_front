import React from 'react';
import like0 from './images/like_0.png';
import like1 from './images/like_1.png';
class PostsItem extends React.Component{

    constructor(props) {
        //A invocação do construtor 'super'
        super(props);
    
        this.state = {
          post: props.post
        };
    }

    render(){
      if(!this.state.post.isLiking){
        return React.createElement("div",{style:{backgroundColor:"#99FF95" ,height:"370px", width:"200px",border:"2px solid #99FF95",margin:"10px", padding:"0px"}},
            React.createElement("p",{style:{textAlign:"center", fontStyle:"italic"}}, this.state.post.caption),
            React.createElement("img",{src:"https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+this.state.post.id+"/image", 
              onClick:() =>this.props.handlePost(), style:{height:"200px", width:"200px"}}),
            React.createElement("p",null,"By: "+this.state.post.user.name),
            React.createElement("img",{src:like0,onClick:() => this.props.handleLike(), style:{width:"20px"}}),
            React.createElement("span",null, this.state.post.likes+"💬"+this.state.post.comments)
        ) 
      }
      else{
        return React.createElement("div",{style:{backgroundColor:"#99FF95" ,height:"370px", width:"200px",border:"2px solid #99FF95",margin:"10px", padding:"0px"}},
            React.createElement("p",{style:{textAlign:"center", fontStyle:"italic"}}, this.state.post.caption),
            React.createElement("img",{src:"https://ipt-ti2-iptgram.azurewebsites.net/api/posts/"+this.state.post.id+"/image", 
              onClick:() =>this.props.handlePost(), style:{height:"200px", width:"200px",}}),
            React.createElement("p",null,"By: "+this.state.post.user.name),
            React.createElement("img",{src:like1, onClick:() => this.props.handleLike(), style:{width:"20px"}}),
            React.createElement("span",null, this.state.post.likes+"💬"+this.state.post.comments)
        ) 
      }
    }
}

export default PostsItem;