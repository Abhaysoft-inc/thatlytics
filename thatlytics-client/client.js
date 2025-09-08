// console.log("this file is gonna integrated in the users website to track")



const logPageView = async () => {

    const dataToSend = {
        event_name: 'pageview',
        url: window.location.href,
        timestamp: Date.now(),
        properties: { "err": "none" }
    };


    const response = await fetch('http://localhost:3000/api/events/saveEvent', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log('Success:', data);
    }).catch(error => {
        console.error('Error:', error);
    });

    console.log(response)


}