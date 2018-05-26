console.log(console.log(process.env.NODE_ENV))
// const HOST = process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? '/api' : 'http://118.25.188.125:8080'
const HOST = 'http://118.25.188.125:8080'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const $fetch = (url, config = {}) => {
  const _config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...config
  };
  config.body && (_config.body = JSON.stringify(config.body));
  return fetch(url, _config)
    .then(checkStatus)  
    .then(res => res.json())
    .then(res => {
      if (res && !(res.success)) {
        throw res.errMsg;
      }
      return res.data;
    })
    .catch(err => console.log(err));
}
export function query() {
  return $fetch(`${HOST}/users`);
}

export async function login(params) {
  return $fetch(`${HOST}/user/login?email=${params.email}&&password=${params.password}`, {
    method: 'POST',
  });
}
export async function logout(email) {
  return $fetch(`${HOST}/user/login?email=${email}`, {
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
  console.log(HOST)
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

export async function removeSubscriptionUrl(id) {
  return $fetch(`${HOST}/user/removeSubscriptionUrl?id=${id}`);
}