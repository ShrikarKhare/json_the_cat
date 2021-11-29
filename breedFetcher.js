const request = require('request');
const input = process.argv.slice(2)[0];
const breedFetcher = (breed, callbackfunction) => {
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`, (err, response, body) => {
    if (response.statusCode !== 200) {
      return callbackfunction("error with server");
    }
    if (err) {
      return callbackfunction(`error finding data for ${breed}`);
    }
    if (breed === undefined) {
      return callbackfunction("Please enter a cat breed");
    }
    console.log(breed);
    let data = JSON.parse(body);
    if (data === undefined || data.length === 0) {
      return callbackfunction('breed does not exist');
    }
    if (data[0].description === undefined || data[0].description === null) {
      return callbackfunction('no information available');
    }
    let returnval;
    if (data) {
      returnval = data[0].description;
    }
    return callbackfunction(returnval);
  });
};

const getInfo = (info) => {
  return console.log(info);
};
breedFetcher(input, getInfo);