// NAMESPACE
var App = App || {};

App.Form = {
    URL:"",
    inputs:{},
    initialize: function(el, data)
    {
        this.el = el;
        if(! data)
        {
            $(el).clear().append("No Connection to server");
            console.warn("no initialize data available");
            return false; 
        }
        
        /*
        var data=
        {
            province:["Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Njombe", "Pwani", "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Tabora", "Tanga", "Zanzibar South and Central"],
            wetness:[{"dry (0-50mm in the last 10 days)":"25"},{"wet (50-120mm in the last 10 days)":"70"},{"extreme wet (>120 mm in the last 10 days)":"200"}],
            forecast:[{"little rainfall (0-20mm in the next 24 hours)":"10"},{"normal rainfall (20-50mm in the next 24 hours)":"35"},{"high rainfall (>50mm in the next 24 hours)":"50"}]
        }
        */
        
        this.inputs = data;
        this.render();
    },
    
    render:function()
    {
        var formgroup = $("<div/>").addClass("formcont");
        for (key in this.inputs)
        {
            if (key === "defaults")
            {
                continue;
            }
            var contain = $("<div/>").addClass("ui-field-contain")
            contain.append($("<label/>").text(key+":").attr("for",key));
            contain.append(this.buildDropdown(this.inputs[key]).attr("name",key));
            formgroup.append(contain);
        }
        
        $(this.el).prepend(formgroup);
        
        var selects = $(formgroup).find("select");
        for (j in selects)
        {
            $(selects[j]).selectmenu();
        }
        
    },
    
    buildDropdown: function (arr) 
    {
        var select=$("<select>");
        for(var i=0; i<arr.length; i++)
        {
            if(typeof arr[i] == "string")
            {
                 select.append($("<option>").val(arr[i]).text(arr[i]));
            }
            else if(arr[i] !== null && typeof arr[i] === 'object')
            {
                for (label in arr[i])
                {
                    select.append($("<option>").val(arr[i][label]).text(label));
                }
            }
        }
        return select;
    }
}