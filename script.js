//System is ready for input
$(document).ready(function() {
    
    $("#submitWeather").on("click", function(event){
        event.preventDefault();
        let city = $("#city").val();
        getCityWeather(city);
        populateHistorySection(city);
    });

    
    //Connect API key to api open weather map and get information 
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
           var nowMoment = moment();

           var displayMoment = $("<h1>");
           $("#city-name").append(
           displayMoment.text("(" + nowMoment.format("D/M/YYYY") + ")")
         );
         }
        })
        
    }

         function returnWeatherForecast(city) {
         let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=84d8ea5be6d3527e97c1d32d85112fb7";
         $.ajax({
            url: queryURL,
           type: "GET",
           dataType: "json",
           success: function(data){
               let forecast1 = document.getElementById("forecast1"); 
               forecast1.textContent = data.list[0].main.temp 
               let forecast2 = document.getElementById("forecast2");
               forecast2.textContent = data.list[1].main.temp 
               let forecast3 = document.getElementById("forecast3");
               forecast3.textContent = data.list[2].main.temp
               let forecast4 = document.getElementById("forecast4"); 
               forecast4.textContent = data.list[4].main.temp
               let forecast5 = document.getElementById("forecast5");
               forecast5.textContent = data.list[5].main.temp
               //data.list[1].data.main.temp
               //data.list[2].data.main.humidity
               // data.list[3].data.wind.speed
               console.log(data, "data")
               
 
               //create elements witrhin that div above and aasign values using data.list[1].wind.speed
          }
         })
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
           $.get(queryURL).then(function(response){
            for (i=0;i<5;i++){
                var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
                var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
                var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
                var tempK= response.list[((i+1)*8)-1].main.temp;
                var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
                var humidity= response.list[((i+1)*8)-1].main.humidity;
            
                $("#fDate"+i).html(date);
                $("#fImg"+i).html("<img src="+iconurl+">");
                $("#fTemp"+i).html(tempF+"&#8457");
                $("#fHumidity"+i).html(humidity+"%");
            }
            
        });
    }
    
    

           

    
















 }})}


})
        