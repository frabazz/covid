const csvToJson = (csv) => {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    return result;
}


const getCovidDataItaly = (callback) => {
    const endpoint = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv"
    fetch(endpoint)
        .then((response) => {
            response.text()
                .then((data) => {
                    callback(
                        csvToJson(data)
                    )
                })
        })
}

//i nomi delle regioni sono con la prima lettera maiuscola -> ex : Sicilia
const getRegion = (data, region) => {
    for (var i = 0; i < data.length; i++) {
        //return data[0]
        if (data[i].denominazione_regione == region) {
            return data[i]
        }
    }
}

const getCovidDataGlobal = (callback) => {
    const endpoint = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
    fetch(endpoint)
        .then((response) => {
            response.json()
                .then((data) => callback(data))
        })
}

const getData = (callback) => {
    const dataObj = {
        global: null,
        italy: null
    }
    getCovidDataGlobal((data) => {
        dataObj.global = data
        getCovidDataItaly((data2) => {
            dataObj.italy = data2
            callback(dataObj)
        })
    })
}

getData((data) => {
    const contagi_italia = data.global.ITA.new_cases
    const contagi_mondo = data.global.OWID_WRL.new_cases
    const contagi_sicilia = getRegion(data.italy, "Sicilia").nuovi_positivi
    const values = document.getElementsByClassName('value')
    values[0].innerHTML = contagi_mondo
    values[1].innerHTML = contagi_italia
    values[2].innerHTML = contagi_sicilia
})