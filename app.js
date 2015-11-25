$(document).ready(function() {
  var $apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
  var appId="70c52de8a83a817fefd04bc910de62e1";
  var $location = {
    city: "Thessaloniki",
    country: "Greece"
  };

  // OpenWeatherMap API
  var updateData = function(data) {
      var city=data.name;
      var Country = data.sys.country;
      var c_Temp = (data.main.temp - 273).toFixed(0);
      var f_Temp = ((c_Temp * 1.8) + 32).toFixed(0);
      var Weather = data.weather[0];
      var WeatherDescription = Weather.description;
      var WeatherIcon = 'http://openweathermap.org/img/w/' + Weather.icon + '.png';
      var WeatherCategory = Weather.main;
      var Clouds = data.clouds.all;
      if (data.rain) {
        var Rain = data.rain[Object.keys(data.rain)[0]]
      };
      var sunriseTime = toTime(new Date(data.sys.sunrise * 1000));
      var sunsetTime = toTime(new Date(data.sys.sunset * 1000));

      $('#cityandcountry').html('<h2 class="time white">'+ city + ',' + Country + '</h2>');
      $('#country').text(Country);
      $('#loading').html('<h3 class="white"><img style="width:88px;" src=' + WeatherIcon + '>' + WeatherDescription + '</h3>');
      $('#sunrise').text(sunriseTime);
      $('#sunset').text(sunsetTime);
      $('#cloud').text(Clouds + '%');

      if(data.rain){
        $('#rain').text(Rain + 'in.')
      };

      if(Country==='US'){
        $('#temperature').text(f_Temp + '°');
      }else{
        $('#temperature').text(c_Temp + '°') ;
        $('#farenheit').removeClass('active');
        $('#celsius').addClass('active');
      }


      if (f_Temp > 90) {
        $('body').css('backgroundImage', 'url(' + 'https://remembermeproductions.files.wordpress.com/2011/08/desert-001.jpg' + ')');
      } else if (f_Temp <= 90) {
        $('body').css('backgroundImage', 'url(' + 'http://cdn.bigbangfish.com/beautiful/beautiful-scenery/beautiful-scenery-1.jpg' + ')');
      } else if (f_Temp < 60) {
        $('body').css('backgroundImage', 'url(' + 'http://www.markdroberts.com/images/red-leaves-frost-7.jpg' + ')');
      } else if (f_Temp < 40) {
        $('body').css('backgroundImage', 'url(' + 'http://epicwallpaperhd.com/wp-content/uploads/2014/07/Snow-Crystal-Photography.jpg' + ')');
      }

      $('#cityandcountry').animate({
        opacity: '1'
      }, 3000);
      $('#temp').animate({
        opacity: '1'
      }, 3000);
      $('#info').animate({
        opacity: '.8'
      }, 3000);

      $('#celsius').click(function() {
        $('#temperature').text(c_Temp + '°');
        $(this).addClass('active');
        $('#farenheit').removeClass('active');
      });

      $('#farenheit').click(function() {
        $('#temperature').text(f_Temp + '°');
        $(this).addClass('active');
        $('#celsius').removeClass('active');
      });


      function toTime(time) {
        var dateHours = time.getHours().toString();
        var dateMinutes = time.getMinutes().toString();
        if (dateMinutes.length < 2) {
          dateMinutes = '0' + dateMinutes
        };
        return dateHours + ':' + dateMinutes;
      }
  };
  var getData = function() {
    $location.city = $("#cityText").val();
    $location.country = $("#countryText").val();
    $.getJSON($apiURL + $location.city + "," + $location.country + "&APPID=" + appId, updateData);
    $("#askWeather").hide();
    $("#showWeather").show();
  };

  var backtoform = function(){
    $("#showWeather").hide();
    $("#askWeather").show();
    $('body').css('background-image', 'url(' + "http://74211.com/wallpaper/picture_big/Free_Scenery_Wallpaper__Shows_Sunny_Springtime_Keep_Spring_All_Around.jpg" + ')');

  }
  // Get data, updateData);
  $("#getWeather").click(getData);

  $("#showWeather").hide();

  $('#askagain').click(backtoform);

});
