process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var raw = JSON.stringify({"email": "langmaster_test@gmail.com", "password": "@Langmaster1"});

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow',
};

fetch("https://lang-master.test/v1/api/login", {
    ...requestOptions,
    headers: {
        "Content-Type": "application/json"
    },
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));