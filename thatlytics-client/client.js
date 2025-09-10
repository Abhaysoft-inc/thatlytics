async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
}

// group session by ip

// if the user ip is same then you should group the session by session id




const logPageView = async () => {

    let params = new URLSearchParams(document.location.search);
    const ip = await getIPAddress();

    const dataToSend = {
        event_name: 'pageview',
        url: window.location.href,
        utm_source: params.get('utm_source'),
        user_ip: ip,
        user_agent: navigator.userAgent,
        referrer: params.get('referrer')
    };


    const response = await fetch('http://localhost:3000/events/recordEvent', {
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