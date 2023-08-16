const request = {
    url: 'https://api.enkod.ru/v1/person/',
    apiKey: 'QaboEndsCjuVF81oAbGfPvs500Vaw5Rta7xhQVn05WMu',
    body: {
        "firstName": "Руслан",
        "lastName": "Галиев",
        "email": "ghaliev@gmail.com",
        "phone": "79177536186",
        "mainChannel": "email",
        "method": "addAndUpdate",
        "groups": [],
        "subscriptionMethod": "subscribeAll"
    }
};
// https://api.runscope.com/radar/inbound/94d3f34d-7f37-4b7e-842a-98618ed3cf74?=var_1={object.first_name}&var_2={object.email}
const http = require('http');
const {response} = require("express");
http.createServer((request, response) => {
    console.log('server work');
    console.log(response.req.url);
    response.end('goo');
}).listen(3000);

function sendDataToEnkod () {
    fetch(request.url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "apiKey": "QaboEndsCjuVF81oAbGfPvs500Vaw5Rta7xhQVn05WMu"
        },
        body: JSON.stringify(request.body)

    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            if (response.status === 201) {
                // Ответ успешен, но пустой, так как это добавление персоны
                console.log("Person added successfully.");
                return; // Возвращаем пустое значение
            }

            return response; // Попробуйте распарсить JSON, если ответ не пустой
        })
        .then(result => {
            if (result) {
                console.log(result.message);
            }
        })
        .catch(error => console.error('Error:', error));
}



