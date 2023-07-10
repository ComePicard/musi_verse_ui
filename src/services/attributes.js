export const getAttributes = async function(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem("token")).access}`);

  const response = await fetch("http://127.0.0.1:8000/attributes/", {method: "GET", headers: myHeaders})
  if(response.ok){
    return response.json()
  } else if (response.status === 500){
    throw new Error("Une erreur côté serveur est survenue")
  } else if (response.status === 401){
    throw new Error("Veuillez vous authentifier pour publier un article")
  } else {
    throw new Error("Une erreur est survenue")
  }
}

export const linkAttribute = async function({
  id_attribute,
  id_article,
  attribute_type,
}){
  var formdata = new FormData();
  formdata.append("attr", id_attribute);
  formdata.append("attribute_type", attribute_type);
  formdata.append("id_article", id_article);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const response = await fetch("http://127.0.0.1:8000/attributes/set/", requestOptions)
  if(response.ok){
    return response.json()
  } else if (response.status === 500){
    throw new Error("Une erreur côté serveur est survenue")
  } else if (response.status === 401){
    throw new Error("Veuillez vous authentifier pour publier un article")
  } else {
    throw new Error("Une erreur est survenue")
  }
}
