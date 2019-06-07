//import console = require("console");

/**
 * Retorna os posts em formato json, odernados pela data
 */
export function getPosts(string){
  return fetch("/api/posts?query="+string, {
    method: "GET",
    headers: {
      //Quero json
      Accept: "application/json"
    }
  }).then((resposta) => {
    if (resposta.status === 200) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
}

/**
 * Retorna os comentários de um post, dado o seu id ex: getComments(post.id)
 * @param {Id do post do qual queremos os comentários} id 
 */
export function getComments(id) {
  return fetch("/api/posts/"+id+"/comments", {
    method: "GET",
    headers: {
      //Quero json
      Accept: "application/json"
    }
  }).then((resposta) => {
    if (resposta.status === 200) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
}
/**
 * 
 * @param {Objeto usado para fazer login contém, Username:* e Password:*s} log 
 */
export async function login(log) {

  let resposta = await fetch("/api/account/login", {
    method: "POST",
    headers: {
      //enviar json
      "Content-Type": "application/json",
      //quero json
      Accept: "application/json"
    },
    body: JSON.stringify(log)
  }).then((resposta) => {
    if (resposta.status === 200) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
  return resposta;
}
export async function logout() {

  let resposta = await fetch("/api/account/logout", {
    method: "POST",
    headers: {
      //enviar json
      "Content-Type": "application/json",
      //quero json
      Accept: "application/json"
    }
  });
  return resposta;
}

export async function like(id) {
  
  let resposta = await fetch("/api/posts/"+id+"/like", {
    method: "POST",
    headers: {
      //enviar json
      "Content-Type": "application/json",
      //quero json
      Accept: "application/json"
    },
  }).then((resposta) => {
    if (resposta.status === 200) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
  return resposta;
}

export async function postComment(content) {
  
  let resposta = await fetch("/api/comments", {
    method: "POST",
    headers: {
      //enviar json
      "Content-Type": "application/json",
      //quero json
      Accept: "application/json",
    },
    body:JSON.stringify(content)
  }).then((resposta) => {
    if (resposta.status === 201) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
  return resposta;
}

export async function deleteComment(id) {
  
  let resposta = await fetch("/api/comments/"+id, {
    method: "Delete",
    headers: {
      //enviar json
      "Content-Type": "application/json",
      //quero json
      Accept: "application/json"
    },
  }).then((resposta) => {
    if (resposta.status === 204) {
      return resposta
    } else {
      return Promise.reject(resposta);
    }
  });
  return resposta;
}

  //Manda imagem
  export async function postAdd(imagem, descricao) {
  let fd = new FormData();
  
  fd.append("image", imagem);
  fd.append("metadata", JSON.stringify({caption:descricao}));
  
  let resposta = await fetch("/api/account/login", {
    method: "POST",
    headers: {
      //quero json
      Accept: "application/json"
    },
    body: fd
  }).then((resposta) => {
    if (resposta.status === 200) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
  return resposta;
}