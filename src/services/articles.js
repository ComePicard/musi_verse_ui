export const getArticle = async function({path}) {
  const response = await fetch(`http://127.0.0.1:8000/articles/${path}`, {method: "GET"})
  if(response.ok){
    return await response.json()
  } else if(response.status === 404){
    throw new Error(`L'article ${path} n'a pas été trouvé`)
  } else {
    throw new Error("Une erreur est survenue")
  }
}

export const postArticle = async function({
  title,
  article_categories,
  description,
  price_range
}){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem("token")).access}`);

  var formdata = new FormData();
  formdata.append("name", title);
  formdata.append("categories", article_categories);
  formdata.append("description", description);
  formdata.append("price_range", `{${price_range}}`);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  const response = await fetch("http://127.0.0.1:8000/articles/", requestOptions)
  if(response.ok){
    return response.json()
  } else if(response.status===500){
    throw new Error("Une erreur côté serveur est survenue")
  } else {
    throw new Error("Une erreur est survenue")
  }
}
