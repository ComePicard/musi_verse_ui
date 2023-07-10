export const postCommentaire = async function({
  path,
  content,
}){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem("token")).access}`);

  var formdata = new FormData();
  formdata.append("description", content);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  const response = await fetch(`http://127.0.0.1:8000/articles/${path}/comments/`, requestOptions)
  if(response.ok){
    return response.json()
  } else if (response.status === 406) {
    throw new Error("Votre commentaire ne correspond pas aux normes du Musiverse (mot banni, insulte, négativité, ...)")
  } else if (response.status === 404) {
    throw new Error("Étrange, il semblerait que nous n'ayont pas trouvé l'article.")
  } else {
    throw new Error("gl hf")
  }
}

export const getCommentaires = async function({path}) {
  const response = await fetch(`http://127.0.0.1:8000/articles/${path}/comments/`, {method: "GET"})
  if(response.ok){
    return response.json()
  } else {
    throw new Error("Un problème est survenu")
  }
}
