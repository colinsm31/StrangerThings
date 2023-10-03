const COHORT_NAME = '2209-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function getPosts(){
  const response = await fetch(`${BASE_URL}`)
  const result = response.json();
  console.log(result);
  return result;
}

export async function register(username, password){
  try{
    const response = await fetch(
      `${BASE_URL}/users/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          }
        })
      }
    )

    const result = await response.json();
    console.log(result);
    return result;
  }catch(error){
    console.error(error);
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    console.log("Login Response:", response); // Log the entire response

    if (response.ok) {
      const data = await response.json(); // Parse the response JSON
      console.log("Login Data:", data); // Log the parsed data
      return data; // Return the parsed data
    } else {
      throw new Error(`Login failed with status ${response.status}`);
    }
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

export async function makePost(token, post){
  try{
    const response = await fetch(
      `${BASE_URL}/posts`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: post.title,
            description: post.description,
            price: post.price,
            location: post.location,
          },
        }),
      });

      const result = await response.json();
      console.log(result);
      return result;
  }catch(error){
    console.error(error);
  }
}

export async function deletePost(token, postId){
  try{
    const response = await fetch(
      `${BASE_URL}/posts/${postId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      const result = await response.json();
      return result;
  }catch(e){
    console.error(e);
  }
}

export function getToken(){
  return sessionStorage.getItem("token") || null;
};

export function userLogin(token){
  sessionStorage.setItem("token", token);
};

export function userLogout(){
  sessionStorage.removeItem("token");
};

export function isLoggedIn(){
  return getToken() !== null;
};

export function makeHeaders(){
  const headers = {
    "Content-Type": "application/json",
  };

  const tokenValue = getToken();

  if (tokenValue) {
    headers["Authorization"] = `Bearer ${tokenValue}`;
  }

  return headers;
};

export async function getUserData(token){
  try{
    const response = await fetch(`${BASE_URL}/users/me`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();
    return result;
  }catch(error){
    console.error(error);
  }
}