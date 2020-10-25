//a weather dashboard with form inputs
$(document).ready(function() {
    
     $("#submitWeather").on("click", function(event){
        event.preventDefault();
        let city = $("#city").val();
        getCityWeather(city);
        populateHistorySection(city);
     });

    
     //Connect API key to api open weather map and get information - I am presented with current and future conditions for that city and that city is added to the search history
     function getCityWeather(city){
     $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=84d8ea5be6d3527e97c1d32d85112fb7"+ "&units=imperial",
       type: "GET",
       dataType: "json",
       success: function(data){
           console.log(data)
           let cityName = document.getElementById("city-name"); 
           cityName.textContent += data.name;
           let cityTemp = document.getElementById("city-temp");
           cityTemp.textContent += " " + data.main.temp + " °C";
           let cityHumidity = document.getElementById("city-humidity");
           cityHumidity.textContent += " " + data.main.humidity  + " %";
           let cityWindSpeed = document.getElementById("city-windspeed");
           cityWindSpeed.textContent += " " + data.wind.speed + " MPH";
       //Weather text and symbols applied
           returnWeatherForecast(city);
           getUVI(data.coord.lat, data.coord.lon);
           cityTemp.textContent += " " + data.main.temp + " °C";

        //Date added to the page alongside city when uploaded into the browser
           let nowMoment = moment();

           let displayMoment = $("<h1>");
           $("#city-name").append(
           displayMoment.text("(" + nowMoment.format("D/M/YYYY") + ")")
         );
         }
        })
        
    }
        //Here you are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
         function returnWeatherForecast(city) {
         let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=84d8ea5be6d3527e97c1d32d85112fb7";
         $.ajax({
            url: queryURL,
           type: "GET",
           dataType: "json",
           success: function(data){
               let forecast1 = document.getElementById("forecast1"); 
               forecast1.textContent = data.list[0].main.temp 
               forecast1.textContent += "\n" + "Humidity:"+ data.list[0].main.humidity;
               let forecast2 = document.getElementById("forecast2");
               forecast2.textContent = data.list[2].main.temp 
               forecast2.textContent += "\n" + "Humidity:"+ data.list[2].main.humidity;
               let forecast3 = document.getElementById("forecast3");
               forecast3.textContent = data.list[3].main.temp
               forecast3.textContent += "\n" + "Humidity:"+ data.list[3].main.humidity;
               let forecast4 = document.getElementById("forecast4"); 
               forecast4.textContent = data.list[4].main.temp
               forecast4.textContent += "\n" + "Humidity:"+ data.list[4].main.humidity;
               let forecast5 = document.getElementById("forecast5");
               forecast5.textContent = data.list[5].main.temp
               forecast5.textContent += "\n" + "Humidity:"+ data.list[5].main.humidity;
          }
         })
         }
          //I view the UV index
          //THEN I am presented with a color that indicates whether the conditions are favorable..
          function getUVI(lat, lon){
          let queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=84d8ea5be6d3527e97c1d32d85112fb7"
           $.ajax({
           url: queryURL,
           type: "GET",
           dataType: "json",
           success: function(data){
           
           let UV = document.getElementById("UV"); 
           UV.textContent = "UV Index: " + data.value;
           $.get(queryURL).then(function(response){
            let currUVIndex = response.value;
            let uvSeverity = "green";
            let textColour = "white";
            if (currUVIndex >= 11) {
                uvSeverity = "purple";
            } else if (currUVIndex >= 8) {
                uvSeverity = "red";
            } else if (currUVIndex >= 6) {
                uvSeverity = "orange";
                textColour = "black"
            } else if (currUVIndex >= 3) {
                uvSeverity = "yellow";
                textColour = "black";
            }
            currWeatherDiv.append(`<p>UV Index: <span class="text-${textColour} ${uvSeverity};">${currUVIndex}</span></p>`);
        })
        }
            });
        }
          
            let localHistory = JSON.parse(window.localStorage.getItem("history")) || [];
            localHistory.push(city);
            window.localStorage.setItem("history",JSON.stringify(localHistory))
            const historyList = document.getElementById("historyList")
            for (let i =0; i < localStorageHistory.length; i++){
            let historyElement = document.createElement("li")
            historyElement.val = historyList[i];
            historyList.appendChild(historyElement);
                }
             });
             function addToList(city){
                let listEl= $("<li>"+city.toUpperCase()+"</li>");
                $(listEl).attr("class","li");
                $(listEl).attr("historyList",C.toUpperCase());
                $(".li").append(listEl);
            }

             function invokePastSearch(event){
                let liEl=event.target;
                if (event.target.matches("li")){
                city=liEl.textContent.trim();
                currentWeather(city);
                }
            }

            function loadlastCity(){
            $("ul").empty();
            let City = JSON.parse(localStorage.getItem("history"));
            if(City!==null){
             City=JSON.parse(localStorage.getItem("history"));
            for(i=0; i<City.length;i++){
            addToList(City[i]);
            }
            city=City[i-1];
            currentWeather(city);
                }
            }

            function clearHistory(event){
                event.preventDefault();
                City=[];
                localStorage.removeItem("cityname");
                document.location.reload();
            }

            $("#historyList").on("click",displayWeather);
            $(document).on("click",pastSearch);
            $(window).on("load",loadlastCity);
            $("#historyList").on("click",clearHistory);
        


    

           

    




















        