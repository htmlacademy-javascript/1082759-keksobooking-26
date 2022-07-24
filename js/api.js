const API = 'https://26.javascript.pages.academy';
const GET_DATA_URL = `${API}/keksobooking/data`;
const POST_DATA_URL = `${API}/keksobooking`;
const DATA_LIMIT = 10;

const getData = async (url = GET_DATA_URL) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data.slice(0, DATA_LIMIT);
};

const sendData = async (data, ...args) => {

  let [ url, options ] = args;

  url = url || POST_DATA_URL;

  if (data) {
    options = options || {
      method: 'POST',
      body: new FormData(data)
    };
  } else {
    throw new Error(`Not correct data: ${data}, POST options:  ${options}`);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
};

export { getData, sendData };
