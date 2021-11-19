const form = document.getElementById('search-form')
const input = document.querySelector('input')
const list = document.querySelector('.cities')
const msg = document.querySelector('.msg')

form.addEventListener('submit', getWeather)

const apiKey = "26056670122d80eeb3453553c8257c98";

function getWeather(e) {
    e.preventDefault()
    const inputVal = input.value

    const listItems = list.querySelectorAll(".city-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            content = el.querySelector(".city-name span").textContent.toLowerCase();
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      }`;
            return;
        }
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            const { main, name, sys, weather } = data
            const icons = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
            console.log(icons);
            const li = document.createElement('li')
            li.classList.add('city')
            const container = `
                <h2 class='city-name' data-name=${name},${sys.country}>
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class = 'city-temp'>
                    ${Math.round(main.temp)}<sup>°C</sup>
                </div>
                <figure>
                    <img class='city-icon' src='${icons}'>
                    <figcaption>
                        ${weather[0]["description"]}
                    </figcaption>
                </figure>
            `
            li.innerHTML = container
            list.appendChild(li)
            msg.textContent = ""
        })
        .catch(() => {
            msg.textContent = "Search a valid city"
        })
    input.value = ""
}