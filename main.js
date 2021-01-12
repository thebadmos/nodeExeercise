const request = require("request");
const fs = require("fs");
const prompt = require('prompt-sync')();


var searchJoke = prompt("Enter Joke Search: ");

request(`https://icanhazdadjoke.com/search?term=${searchJoke}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var jokesBody = JSON.parse(body);

        var jokes = jokesBody.results.map((joke) => {
            return joke.joke
        });

        var index = Math.floor(Math.random() * jokes.length);
        console.log(jokes[index]);

        fs.writeFile("jokes.txt", jokes[index], (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Joke added successfully!");
            }
        })
    } else {
        console.log('No jokes where found for that keyword!');
    }
});