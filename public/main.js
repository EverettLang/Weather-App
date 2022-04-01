function search(unit){
    const regexExp = /^((\-?|\+?)?\d+(\.\d+)?)\s*(,|\s)\s*(\s*|-)\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;
    if(regexExp.test(document.querySelector(".search-bar").value)){
        try{
            const latlon = document.querySelector(".search-bar").value.split(/[, ]+/);
            fetchCoordinates(latlon[0].trim(), latlon[1].trim(), unit);
        }
        catch(err){
            alert("In fetchCoordinates" + err);
        }
    }
    else{
        try{
            fetchCity(document.querySelector(".search-bar").value, unit);  
        } 
        catch(err){
            alert("In Fetch City" + err);
        }
    }
      
}

async function fetchCity(city, unit){
    const url = `/weatherCity/${city}/${unit}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    displayWeather(json, unit)  
}

async function fetchCoordinates(lat, lon, unit){
    const url = `/weatherCoordinates/${lat}/${lon}/${unit}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);  

    
    displayWeather(json, unit)  
}

function displayWeather(data, unit){

    const name = (data.name !== "" ? data.name : 'N/A');  
    const  country  = (typeof data.sys.country !== "undefined" ? data.sys.country : 'N/A');  
    console.log(name);
    console.log(country); 
    const { icon, description } = data.weather[0];
    const { temp, feels_like} = data.main;
    const { speed } = data.wind;

    const { humidity } = data.main;
    const { pressure } = data.main;
    const { sunrise } = data.sys;
    const { sunset } = data.sys;
    

    console.log("Testing");
    let sunriseTime = moment.unix(sunrise).format('HH:mm');
    let sunsetTime = moment.unix(sunset).format('HH:mm');
    console.log(sunriseTime);
    console.log(sunsetTime);
    

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?Landscape " + name + "')";
    console.log(name,icon,description,temp,feels_like,speed, humidity, pressure, sunrise, sunset);
    console.log(data);

    if(unit == "metric"){
        console.log("gets into metric if");
        document.querySelector(".city").innerText = name + ", " + country;
        document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".feels-like").innerText = "Feels Like: " + Math.floor(feels_like) + "°C";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.floor(speed) + " km/h";

        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".sunrise-sunset").innerText = "Sunrise-Sunset: " + sunriseTime + "-" + sunsetTime;
    }
    else{
        console.log("gets into imperial if");
        document.querySelector(".city").innerText = name + ", " + country;
        document.querySelector(".temp").innerText = Math.floor(temp) + "°F";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".feels-like").innerText = "Feels Like: " + Math.floor(feels_like) + "°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.floor(speed) + " mph"; 

        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".sunrise-sunset").innerText = "Sunrise-Sunset: " + sunriseTime + "-" + sunsetTime;
    }

    document.querySelector(".weather").style.cssText = "display: contents";
}

//Runs Search if Mouse clicked mag glass
document.querySelector(".enter-button").addEventListener("click", function(){
    //checking Temp Unit
    if(document.querySelector(".unit-icon").title == "C"){
        // api.search("metric");
        search("metric");
    }
    else{
        // api.search("imperial");
        search("imperial");
    }
    
});

//Runs Search if "Enter" key is pressed
document.querySelector(".search-bar").addEventListener("keypress", function(e){
    if(e.key == 'Enter'){
        //Checking Temp Unit
        if(document.querySelector(".unit-icon").title == "C"){
            // api.search("metric");
            search("metric");
        }
        else{
            // api.search("imperial");
            search("imperial");
        }
    }
});

//Sets unit toggle div when clicked.
//If a search already happened it will toggle units for displayed search
document.querySelector(".unit-icon").addEventListener("click", function(event){
    if(this.title == "C"){
        this.title = "F";
        this.textContent = "°F"
    }
    else{
        this.title = "C";
        this.textContent = "°C"  
    }

    console.log(document.querySelector(".weather").style.cssText)

    if(document.querySelector(".weather").style.cssText == "display: contents;"){
        console.log("Got in");
        if(document.querySelector(".unit-icon").title == "C"){
            // api.search("metric");
            search("metric");
        }
        else{
            // api.search("imperial");
            search("imperial");
        }
    }

    
});

