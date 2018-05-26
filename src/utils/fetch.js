function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const $fetch = (url, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  
  return fetch(url, newOptions)
    .then(checkStatus)  
    .then(res => res.json())
    .then(res => {
      if (res && !(res.success)) {
        throw res.errMsg;
      }
      return res.data;
    })
}

export default $fetch;