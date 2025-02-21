// script for login
var requestConfig = {
    method: 'POST',
    url: 'https://api.escuelajs.co/api/v1/auth/login',
    header: 'Content-Type: application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            "email": "john@mail.com",
            "password": "changeme"
        })
    }
};

pm.sendRequest(requestConfig, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        if (response.code === 201) {
            var responseBody = response.json();
            var accessToken = responseBody.access_token;
            var refreshToken = responseBody.refresh_token;
            //script to retrieve access token and refresh token data, and to set environment access_token for authorization get profile
            pm.collectionVariables.set('access_token', accessToken);
            pm.collectionVariables.set('refresh_token', refreshToken);
            pm.environment.set("access_token", accessToken);
            console.log("access_token = "+ accessToken)
            
        } else {
            console.error('Failed to login. Response code:', response.code);
        }
    }
});

// Script to get profile
var requestConfig = {
    method: 'GET',
    url: 'https://api.escuelajs.co/api/v1/auth/profile',
    header: 'Content-Type: application/json', 
    header: 'Authorization: Bearer ' + accessToken,
    body: {}
};

pm.sendRequest(requestConfig, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        if (response.code === 200) {
            var responseBody = response.json();
            var name = responseBody.name;
            var email = responseBody.email;
            console.log("Name = "+ name)
            console.log("Email = "+ email)
            
        } else {
            console.error('Failed to login. Response code:', response.code);
        }
    }
});
//Script for post to validate refresh_token
var refresh_token = pm.collectionVariables.get('refreshToken');
console.log ("refresh_token =" + refresh_token)
var requestConfig = {
    method: 'POST',
    url: 'https://api.escuelajs.co/api/v1/auth/refresh-token',
    header: 'Content-Type: application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            "refreshToken": refresh_token
        })
    }
};

pm.sendRequest(requestConfig, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        if (response.code === 201) {
            var responseBody = response.json();
            var accessToken = responseBody.access_token;
            var refreshToken = responseBody.access_token;
            pm.collectionVariables.set('accessToken', accessToken);
            pm.collectionVariables.set('refreshToken', refreshToken);
            
        } else {
            console.error('Failed to login. Response code:', response.code);
        }
    }
});

//script for negative case invalid credential
var requestConfig = {
    method: 'POST',
    url: 'https://api.escuelajs.co/api/v1/auth/login',
    header: 'Content-Type: application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            "email": "john@mail.com",
            "password": "changetertme"
        })
    }
};

pm.sendRequest(requestConfig, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        if (response.code === 401) {
            var responseBody = response.json();
            var message = responseBody.message;
            console.log("message = "+ message)
            
        } else {
            console.error('Failed to login. Response code:', response.code);
        }
    }
});
