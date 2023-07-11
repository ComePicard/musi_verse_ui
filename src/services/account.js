export const createUser = async function({
   username,
   password,
   email,
   first_name,
   last_name,
}) {
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("email", email);
  formdata.append("first_name", first_name);
  formdata.append("last_name", last_name);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const response = await fetch("http://127.0.0.1:8000/users/", requestOptions)
  if(response.ok){
    return response.json()
  } else {
    throw new Error(`Erreur lors de la création du compte. Code d'erreur : ${response.status}`)
  }
}


export const getToken = async function({
  username,
  password
}){

  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const response = await fetch("http://127.0.0.1:8000/api/token/", requestOptions)
  if(response.ok){
    return response.json()
  } else {
    throw new Error("Erreur lors de l'authentification")
  }
}


export const getCurrentUser = async function(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem("token")).access}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("http://127.0.0.1:8000/users/", requestOptions)
  if(response.ok){
    return response.json()
  } else {
    throw new Error("Erreur lors de la récupération de l'utilisateur")
  }
}
