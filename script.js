$(document).ready(function() {
    $("#submitWeather").on("click", function(event){
        event.preventDefault();
        let city = $("#city").val();
        getCityWeather(city);
        populateHistorySection(city);
    });
    
    //Connect API key
    function getCityWeather(city){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=84d8ea5be6d3527e97c1d32d85112fb7",
       type: "GET",
       dataType: "json",
       success: function(data){
           console.log(data)
           let cityName = document.getElementById("city-name"); 
           cityName.textContent = data.name;
           let cityTemp = document.getElementById("city-temp");
           cityTemp.textContent = data.main.temp;
           let cityHumidity = document.getElementById("city-humidity");
           cityHumidity.textContent = data.main.humidity;
           let cityWindSpeed = document.getElementById("city-windspeed");
           cityWindSpeed.textContent = data.wind.speed;
           //temp data.main.temp
           //wind speed 
           //humidity
           returnWeatherForecast(city);
           getUVI(data.coord.lat, data.coord.lon);
       }
        });

    }
    function returnWeatherForecast(city) {
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=84d8ea5be6d3527e97c1d32d85112fb7";
        $.ajax({
            url: queryURL,
           type: "GET",
           dataType: "json",
           success: function(data){
               let forecast1 = document.getElementById("forecast1"); 
               let forecast2 = document.getElementById("forecast2");
               let forecast3 = document.getElementById("forecast3");
               let forecast4 = document.getElementById("forecast4"); 
               let forecast5 = document.getElementById("forecast5");
               data.list[1].data.main.temp
               data.list[2].data.main.humidity
               data.list[3].data.wind.speed
               

              
               //create elements witrhin that div above and aasign values using data.list[1].wind.speed
    }
});
    }

    function getUVI(lat, lon){
        let queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=84d8ea5be6d3527e97c1d32d85112fb7"
        $.ajax({
            url: queryURL,
           type: "GET",
           dataType: "json",
           success: function(data){
               console.log(data);
               let UV = document.getElementById("UV"); 
           UV.textContent = "UV Index: " + data.value;
           }
    });
   
    }

    function populateHistorySection(city){

    
    



        let localHistory = JSON.parse(window.localStorage.getItem("history")) || [];
        localHistory.push(city);
        window.localStorage.setItem("history",JSON.stringify(localHistory))

        // const historyList = document.getElementById("historyList")
        // for (let i =0; i < localStorageHistory.length; i++){
        //     let historyElement = document.createElement("li")
        //     historyElement.val = historyList[i];
        //     historyList.appendChild(historyElement); 
        }
    
});