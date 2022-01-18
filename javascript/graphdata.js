const translation = {
    "last_updated_date": "ultimo aggiornamento",
    "total_cases": "casi totali",
    "population": "popolazione",
    "new_cases": "nuovi casi",
    "total_deaths": "morti totali",
    "new_deaths": "nuovi morti",
    "new_tests": "nuovi tamponi effettuati",
    "median_age": "et&#224; media", //problema di encoding &#224; = è
    "total_vaccinations": "vaccinazioni totali",
    "total_boosters": "dosi totali booster",
    "positive_rate": "tasso di positivit&#224;"
}

/*const getCovidDataGlobal = (callback) => {
    const endpoint = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
    fetch(endpoint)
        .then((response) => {
            response.json()
                .then((data) => callback(data))
        })
}*/


const setupGraph = (data, id, api_id) => {
    const tbody = document.getElementById(id)
    const extract = data[api_id]
    const table = {}
    Object.keys(translation).forEach((key) => {
        table[translation[key]] = extract[key]
    })
    Object.keys(table).forEach((key) => {
        let tr = `
            <tr>
                <td>${key}</td>
                <td>${table[key]}</td>
            <tr/>
        `
        if (table[key] != null) tbody.innerHTML += tr;
    })
}

const tableToFun = (id, fun) => {
    if (document.getElementById(id) != null) fun(id)
}

getCovidDataGlobal((data) => {
    tableToFun('covid-table-ita', (id) => setupGraph(data, id, "ITA"))
    tableToFun('covid-table-eur', (id) => setupGraph(data, id, "OWID_EUN"))
    tableToFun('covid-table-wrl', (id) => setupGraph(data, id, "OWID_WRL"))

    console.log(ITA)
})