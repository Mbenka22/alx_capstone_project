 async function fetchData(url){
    const response =await fetch(url)
    const data = await response.json()
    //console.log (data)

    const resource=data.results
    console.log(resource)
    output=''//to store 
    resource.forEach(item =>{
        output += `<div class="${endpoint}-card card" data-type="${endpoint}" data-id="${item.url.split("/").filter(Boolean).pop()}">
                    ${endpoint === "planets" ? 
                    `<h2>${item.name}</h2>
                    <p>${item.climate}</p>`:
                    endpoint === "people"?
                    `<h2>${item.name}</h2>
                    <p>${item.birth_year}</p>`:
                    endpoint === "films" ?
                    `<h2>${item.title}</h2>
                    <p>${item.producer}</p>` : ''}
                </div>`
    })
    containerElement.innerHTML = output
}
 fetchData("https://swapi.dev/api/planets/")