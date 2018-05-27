import $fetch from './fetch';
// const HOST = process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? '/api' : 'http://118.25.188.125:8080'
const HOST = 'http://118.25.188.125:8080'


export function query() {
  return $fetch(`${HOST}/users`);
}

export async function login(params) {
  return $fetch(`${HOST}/user/login?email=${params.email}&&password=${params.password}`, {
    method: 'POST',
  });
}
export async function logout(email) {
  return $fetch(`${HOST}/user/logout`, {
    method: 'POST',
  });
}
export async function register(payload) {
  return $fetch(`${HOST}/user/register`, {
    method: 'POST',
    body: payload,
  });
}

export async function getCode(email) {
  return $fetch(`${HOST}/user/captcha?email=${email}`, {
    method: 'POST',
  });
}

export async function getResetUrl(email) {
  return $fetch(`${HOST}/user/getreseturl?email=${email}`, {
    method: 'POST',
  });
}

export async function authority() {
  
  return $fetch(`${HOST}/user/authority`);
}

export async function addSubscriptionUrl(payload) {
  return $fetch(`${HOST}/user/addSubscriptionUrl`, {
    method: 'POST',
    body: payload
  });
}

export async function getProfile(email) {
  return $fetch(`${HOST}/user/profile?email=${email}`);
}

export async function getTags(email) {
  return $fetch(`${HOST}/user/getTags?email=${email}`);
}

export async function getPages(email) {
  // return $fetch(`${HOST}/user/webpages?email=${email}`);
  return require('../mock.json');
}

export async function removeSubscriptionUrl(id) {
  return $fetch(`${HOST}/user/${id}`, {
    method: 'DELETE'
  });
}


export async function getPage(id) {
  console.log(id)
  // return $fetch(`${HOST}/user/webpages?email=${email}`);
  return require('../mock.json').filter(i => i.id === Number(id))[0];
}