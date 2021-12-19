import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weahter-content',
  templateUrl: './weahter-content.component.html',
  styleUrls: ['./weahter-content.component.css']
})
export class WeahterContentComponent implements OnInit {
  forecasts_days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  forecast_choosen_days:string[]=[]
  auto_complete_results:any = []
  city_to_search:string = 'Tel Aviv'
  api_key:string ="xwfRhiruSxM7D0mLoQclQK3t3QABmnC4";
  auto_complete_api_url:string = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey="
  current_api_url = "https://dataservice.accuweather.com/currentconditions/v1/"
  forecast_api_url ="http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
  server_apiUrl = "http://localhost:3000/"
  city_key: string = "215854"
  city_localized_name: string = "Tel Aviv"
  metric_imperial:string = "Metric" 
  current_degrees:string = ''
  day_of_the_week:string = ''
  five_days_forecast:any[] = []
  weather_text:string = ''
  c_f = 'c';

  constructor(private http:HttpClient) {
    
    switch (new Date().getDay()) {
      case 0:
        this.day_of_the_week = "Sunday";
        break;
      case 1:
        this.day_of_the_week = "Monday";
        break;
      case 2:
        this.day_of_the_week = "Tuesday";
        break;
      case 3:
        this.day_of_the_week = "Wednesday";
        break;
      case 4:
        this.day_of_the_week = "Thursday";
        break;
      case 5:
        this.day_of_the_week = "Friday";
        break;
      case 6:
        this.day_of_the_week = "Saturday";
    }
    this.getFromApi()
   }

  ngOnInit(): void {

  }

  updateAutoComplete(searchValue: any){
    
    this.city_to_search = searchValue.target.value;
    
  }
  getFromApi()
  {
    this.forecast_choosen_days=[]
    this.http.get(this.auto_complete_api_url+this.api_key+"&q="+this.city_to_search+"&language=en-us",{responseType:'json'}).subscribe(result=>{
      this.auto_complete_results = []
      this.auto_complete_results = result
      this.city_localized_name =  this.auto_complete_results[0]['LocalizedName'];
      this.http.get(this.current_api_url+this.city_key+"?apikey="+this.api_key+"&language=en-us&details=true",{responseType:'json'}).subscribe(current_result=>{
        let results:any = [];
        results = current_result;
        this.current_degrees = results[0]['Temperature'][this.metric_imperial]['Value']
       this.weather_text = results[0]['WeatherText']
        this.http.get(this.forecast_api_url+this.city_key+"?apikey="+this.api_key+"&language=en-us&details=true&metric="+(this.metric_imperial=='Metric'?'true':'false'),{responseType:'json'}).subscribe(forecast_result=>{
          let five_days:any = [];
          five_days = forecast_result;
          this.five_days_forecast = five_days['DailyForecasts']
          
          this.five_days_forecast.forEach(element => {
            this.forecast_choosen_days.push(this.forecasts_days[new Date(element['Date']).getDay()].substring(0,3));
            
          });
         });        
      });

    });
  }
  addToFavorites()
  {
    this.http.post(this.server_apiUrl+'addNewFavorite',{
      "date": new Date(),
      "name":this.city_localized_name,
      "text": this.weather_text,
      "degrees": this.current_degrees
     }).subscribe((result: any) => {
     });
  }
  changeDegreesToggle()
  {
    if(this.metric_imperial=='Metric')
    {
      this.metric_imperial='Imperial';
      this.c_f = 'f';
    }else
    { 
      this.metric_imperial='Metric';
      this.c_f = 'c';
    }
    this.getFromApi();
    document.documentElement.style.setProperty('--black-color', '#141313');
  }
}
