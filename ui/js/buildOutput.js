// NAMESPACE
var App = App || {};

App.Overview = {
    initialize: function(el,data)
    {
        this.summaryListEl = $(el).find("#summaryList");  
        this.eventListEl = $(el).find("#eventList"); 
        this.data = data;
        this.render();
        var activeUrl = window.location.href.split("#")[0];
        
        window.location.href = activeUrl+"#results";
    },
        
    render:function()
    {
        if (this.data.length > 0)
        {
            var sumData = this.getSummary(this.data);
            this.renderSummaryList(sumData);
            this.renderEventList();
            this.eventListEl.listview().listview('refresh');
        }
        else
        {
           this.summaryListEl.html("");
           this.eventListEl.html("");
           this.eventListEl.append("<span class='no_Data'>No Data available</span>");
        }        
    },
    
    renderEventList: function()
    {
        this.eventListEl.html("");
        for (index in this.data)
        {
             var pageURL = this.buildDetailPage(this.data[index]);
             var li = $("<li/>").append($("<a/>").attr("href","#"+pageURL).text(this.data[index].title));
             this.eventListEl.append(li);
        }
        
    },
    
    renderSummaryList: function(sumData)
    {
        this.summaryListEl.html("");
        var summaryFields = 
        {
            evacuated_integer: "Evacuated",
            casualties_integer:"Casualties",
            damage_economy: "Monetary damages",
            identifiers:"Effects",
            location:"Locations",
            damaged_property:"Property damage",
            duration:"Duration in days",
        };
        
        for (key in summaryFields)
        {
            var label = $("<span/>").addClass("key").text(summaryFields[key]+": ");
            var value = $("<span/>").addClass("value").text(sumData[key]);
            
            var li = $("<li/>").append(label).append(value);
            this.summaryListEl.append(li)
        }
    },
    
    getSummary: function(data)
    {
        var summary = {};
        //first concatenate everything
        for (var index in this.data)
        {
            var event= this.data[index];
            for (var key in event) 
            {
                if (!summary[key])
                {
                    summary[key] = {};
                    summary[key].num = [];
                    summary[key].string =[];
                }
                
                if (event[key] == "nan")
                {
                    summary[key].num.push(NaN);
                    summary[key].string.push(" ");
                }    
                else if (/^[0-9,.]*$/.test(event[key])) //number with point or comma
                {
                    //remove point and commas
                    event[key] = event[key].replace(/[,]+/g,"");
                    summary[key].string.push(event[key]); //push to string
                }
                else {  //string
                    
                    var array = event[key].split(", ");
                    if (array.length > 1)
                    {
                        for (var j = 0; j<array.length;j++)
                        {
                            summary[key].string.push(array[j].trim());
                        }
                    }
                    else
                    {
                        summary[key].string.push(array[0].trim());
                    }
                }
                                
                var num = parseFloat(event[key].replace(/[^0-9]/, ''));
                if (!isNaN(num))
                {
                    summary[key].num.push(num);
                }                  
            } 
        }
        
        // find min and max in numbers
        var targetLength = this.data.length;
        
        for (var key in summary)
        {
            //console.log(key,summary[key]);
            if(summary[key].num.length == targetLength)
            {
                var min = summary[key].string[this.findIndexOfMinMax(summary[key].num,"min")];
                var max = summary[key].string[this.findIndexOfMinMax(summary[key].num,"max")];
                if (min == max)
                {
                    summary[key] = "Up to "+max.replace(/\.0+$/,'');
                }
                else
                {
                    summary[key] = "From " + min.replace(/\.0+$/,'') + " to " + max.replace(/\.0+$/,'');
                }
            }
            else
            {
                
                //make unique
                var seen = {};
                var out = [];
                var len = summary[key].string.length;
                var j = 0;
                for(var i = 0; i < len; i++) {
                     var item = summary[key].string[i];
                     if(seen[item] !== 1) {
                           seen[item] = 1;
                           out[j++] = item;
                     }
                }

                summary[key] = out.join(", ");
            }
        }
        return summary;
    },
    
    findIndexOfMinMax: function(array, minmax) 
    {
      var tmpVar;
      var foundIndex;
        
      if(minmax != "min" && minmax != "max")
        {
            return false;
            console.warn("missing config minmax");
        }
        
      if (minmax == "min")
          {
             for (var i = 0; i < array.length; i++) {
                if (!tmpVar || array[i] < tmpVar) {
                  tmpVar = array[i];
                  foundIndex = i;
                }
              }
          }
      else if (minmax == "max")
          {
              for (var i = 0; i < array.length; i++) {
                if (!tmpVar || array[i] > tmpVar) {
                  tmpVar = array[i];
                  foundIndex = i;
                }
              }
          }

      return foundIndex;
    },
    
    buildDetailPage: function(event)
    {
        var source   = document.getElementById("page-template").innerHTML;
        var template = Handlebars.compile(source);
        var eventData =
        {
        //title
        title:"",
        id:"",
        //attributes obj key value
         attributes:{
                        
                    },
        //rainfall obj key value
         rainfall:{
                        "day1":"",
                        "day3":"",
                        "day7":"",
                        "day10":""
                    },
        //links arr 
        links:[
                {url:""}
            ]
        };
        
        for(key in event)
        {
            switch (key) {
                case "24hr Rainfall":
                        eventData.rainfall["day1"] = {name:key, value:parseFloat( event[key]).toFixed(2)};
                    break;
                case "3day Rainfall":
                        eventData.rainfall["day3"]  = {name:key, value:parseFloat( event[key]).toFixed(2)};
                    break;
                case "7day Rainfall":
                        eventData.rainfall["day7"]  = {name:key, value:parseFloat( event[key]).toFixed(2)};
                    break;
                case "10day Rainfall":
                        eventData.rainfall["day10"] = {name:key, value:parseFloat( event[key]).toFixed(2)};
                    break;
                case "title":
                        eventData.title = event[key];
                    break;
                case "event_id":
                        eventData.id = "eventDetail"+event[key];
                    break;
                case "casualties_integer": //ignore these
                case "evacuated_integer":
                case "time_expressions":
                case "time":
                    break;
                case "url":
                        eventData.url = event[key].split(";");                    
                    break;
                default:
                    if (event[key] !== "nan")
                    {
                        eventData.attributes[key]  = event[key];
                    }
                    break
            }
        }
        
        Handlebars.registerHelper("inc", function(value, options)
        {
            return parseInt(value) + 1;
        });
    
        $("body").append(template(eventData));
        return eventData.id;   
    }
}