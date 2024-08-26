let data = [];

async function getData(country) {
    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?iconSet=icons1&include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=K3GQGL5YM7EVUKK3F5UX529J9&options=beta&contentType=json`, options);
        if (!response.ok) {
            if (response.status === 404) {
                alert(`Error 404: Country "${country}" not found.`);
            } else {
                alert(`Error country not found`);
            }
            return;  // Exit the function
        }
        const result = await response.json(); 
        data = result;  
        displayData(data);
         updateCurrentWeather(data)  
    } catch (error) {
        console.error(error);
    }
}
function displayData(data) {
    console.log(data);  
}
function returnText() {
    let country = document.getElementById("userInput").value;
    if (country) {
        getData(country);  
    } else {
        alert("Please enter a country name");
    }
}
function checkEnter(event) {
    if (event.key === "Enter") {
        returnText(); 
    }
}
    // const d = new Date();
    // let text = d.toDateString();
    function formatDateTime() {
        const now = new Date();
        
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[now.getDay()];
    
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    
        const time = `${hours}:${minutes} ${amPm}`;
        
        return `${dayOfWeek}, ${time}`;
    }
    const formattedDateTime = formatDateTime();
    
function updateCurrentWeather(data) {
    console.log(data)
    document.getElementById('temperature').innerHTML = `${convertToCelsius(data.currentConditions.temp)}&deg;C`;
    document.getElementById('weatherIcon').src =`../image/icon/${data.currentConditions.icon}.png`
    document.getElementById('time').textContent = `${formattedDateTime}`;
    document.getElementById('location').textContent = `${data.address} ${data.timezone}`;
    document.getElementById('weatherDescription').textContent = data.currentConditions.conditions;
    document.getElementById('humidity').textContent = data.currentConditions.humidity;
    document.getElementById('sunrise').textContent = data.currentConditions.sunrise;
    document.getElementById('sunset').textContent = data.currentConditions.sunset;
    document.getElementById('precipitation').textContent = `${data.currentConditions.precipprob}%`;
    document.getElementById('pressure').textContent = `${data.currentConditions.pressure} Mb`;
    document.getElementById('windSpeed').textContent = `${data.currentConditions.windspeed}`;
   
        for (let i = 0; i < data.days.length; i++) {
            document.getElementById(`forecastTemp${i + 1}`).textContent = `Max: ${convertToCelsius(data.days[i].tempmax)} °C / Min: ${convertToCelsius(data.days[i].tempmin)} °C`;
            document.getElementById(`forecastDesc${i + 1}`).textContent = data.days[i].conditions;
            document.getElementById(`forecastIcon${i+1}`).src =`../image/icon/${data.days[i].icon}.png`

        }
    
    

}

// for(i=0; i<data.days;i++){
// }



function convertToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(1);
}

