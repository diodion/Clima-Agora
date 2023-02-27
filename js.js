const container = document.querySelector(".container");
const pesquisa = document.querySelector(".pesquisa-campo button");
const climaBox = document.querySelector(".clima-container");
const climaDetalhes = document.querySelector(".clima-detalhes");
const error404 = document.querySelector(".nao-localizado");

pesquisa.addEventListener("click", () => {

    const APIKey = '3c7c900730f3476903e64daadd6fcaf7';
    const city = document.querySelector(".pesquisa-campo input").value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '500px';
                climaBox.style.display = 'none';
                climaDetalhes.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');


            const imagem = document.querySelector('.clima-container img');
            const temperatura = document.querySelector('.clima-container .temperatura');
            const descricao = document.querySelector('.clima-container .descricao');
            const humidade = document.querySelector('.clima-detalhes .humidade span');
            const vento = document.querySelector('.clima-detalhes .vento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    imagem.src = 'img/limpo.png';
                    break;

                case 'Rain':
                    imagem.src = 'img/chuva.png';
                    break;

                case 'Snow':
                    imagem.src = 'img/neve.png';
                    break;

                case 'Clouds':
                    imagem.src = 'img/nuvens.png';
                    break;

                case 'Haze':
                    imagem.src = 'img/nublado.png';
                    break;

                default:
                    imagem.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            humidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            climaBox.style.display = '';
            climaDetalhes.style.display = '';
            climaBox.classList.add('fadeIn');
            climaDetalhes.classList.add('fadeIn');
            container.style.height = '590px';

        })

});
