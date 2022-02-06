const nasdaqUrl = "https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD?limit=1&api_key=EVBtD729dNLD2wdH2m6P";
var weightInput;
var fromUnit;
var fromUnitId;
var nasdaqData;
var troyOz;
var theData;

var getUrl = function(){
    var url = 'http://' + location.host;
    url += '/unitconv/convert?from=';
    url += fromUnitId + "&to=t_oz&value=" + weightInput;
    return url;
}

document.getElementById("body").onload = function() {getPrice()};

function getPrice(){
    document.querySelector('#msgText').textContent = "Please Wait";
    fetch(nasdaqUrl)
        .then(response => {
            return response.json();
            })
        .then(json => {
            if(json.hasOwnProperty('error')){
                theData = "down";
                document.querySelector('#msgText').textContent = "A Wild TypeError Appears! Wait A Moment And Refresh The Page To Try Again";

            }
            else{
                console.log(json);
                document.querySelector('#msgText').textContent = "The Price Of Gold As Of " + json.dataset.end_date +
             " is $" + json.dataset['data'][0][2] + " Per Troy Ounce";
                theData = json;
//                divCreator();
            }
        })
        .catch(err =>{
            theData = "down";
            document.querySelector('#msgText').textContent = "A Wild TypeError Appears! Wait A Moment And Refresh The Page To Try Again";

        })
        .finally(()=>{
//            theData += "";
        });
}

function getDateTimeString(date) {
    var today = date.toString().split(" ").splice(0,5);
    return today.join(" ") + " ";
}

function divCreator(){
    var newDiv = document.createElement('div');
    var newDivText = document.createElement('p');
    var mainDiv = document.getElementById("mainDiv");
    console.log("Weight input " + weightInput)

     if(troyOz == "block" || troyOz == "invalid"){
        newDiv.setAttribute('class', 'red')
        if(troyOz == "block"){
            newDivText.textContent = "At " + getDateTimeString(new Date()) + "A Wild TypeError Appears!";
        }
        else{
            newDivText.textContent = "Please Enter A Valid Weight Input And Try Again!";
        }
        newDiv.appendChild(newDivText);
        newDiv.addEventListener('click', function (event){
            newDiv.remove();
        });
        document.body.insertBefore(newDiv, mainDiv.nextSibling);
    }
    else if(theData == "down"){

    }
    else{
        newDivString = "At " + getDateTimeString(new Date()) + " ";
        newDivString += weightInput + " " + fromUnit + " " + "Of Gold Is Worth $";
        var price = (theData.dataset['data'][0][2] * troyOz);
        newDivString += price.toFixed(2);
        newDivText.textContent = newDivString;
        newDiv.appendChild(newDivText);
        newDiv.setAttribute('class', 'green');
        newDiv.addEventListener('click', function (event){
            newDiv.remove();
        });
        document.body.insertBefore(newDiv, mainDiv.nextSibling);
        }
}

var go_fetch = function(select){
    weightInput = document.getElementById("weight").value;
    var unitSelector = document.getElementById("dataset");
    fromUnit = unitSelector.options[unitSelector.selectedIndex].value;

    if(weightInput == "" || isNaN(weightInput)){
        troyOz = "invalid";
        divCreator();
        return;
    }
    else if(weightInput < 0){
        troyOz = "invalid";
        divCreator();
        return;
    }


    fromUnitId = unitSelector.options[unitSelector.selectedIndex].id;
    let url = getUrl();
    if(url){
        unitConvFetch(url);
    }
}



function unitConvFetch(url) {
   fetch(url)
        .then(response => {
            return response.json()
        })
        .then(json => {
            if (json.hasOwnProperty('error')) {
                troyOz = "block";
            }
            else {
                troyOz = json.value;
            }
        })
        .catch(err => {
            troyOz = "block";
        })
        .finally(() => {
            divCreator();
        });
}


