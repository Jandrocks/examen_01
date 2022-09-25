// logica de la carga de tendencia

import { getObserver } from "./observer.js";
const listOnlyImagen = document.querySelector("#contenedor_gift");


let offset = 0;
let dataAPI = [];
const BASEURL = 'https://api.giphy.com';

export const cargaTendenciaGift = async () => {
	try {
		const url = `${BASEURL}/v1/gifs/trending?api_key=BidAdtjx9l11Yw6FiLCd7Euz7qTUHYyf&limit=10&offset=${offset}`
    const getGiftTen = await fetch(url);
		const { data } = await getGiftTen.json();
		offset += 10;
		
		switch (getGiftTen.status) {
			case 200:
				dataAPI = [...data];
      	giftTendenciaPrint();
				getObserverWithAPI();
			break;

			case 401:
				console.log("DATOS ENVIADOS INCORRECTOS");
			break;

			case 404:
				console.log("NO SE PUDO CONECTAR AL SERVIDOR - URL ERRONEA");
			break;
		
			default:
				console.log("OCURRIO UN ERROR - NO ES ERROR 401 - 404");
			break;
		}
  } catch (error) {
		console.log(error);
  }
};

const makeImg = gift => {
	const { id, images:{ downsized_medium }, title, url } = gift;
	const className = "img-gift";
	const enlaceHref = document.createElement('a');
	
	enlaceHref.href = url;
	enlaceHref.target = '_blank';
	enlaceHref.class = 'class';
	
	const img = document.createElement('img');
	img.id = id;
	img.src = downsized_medium.url;
	img.alt = title;
	img.title = title;
	img.class = className;
	enlaceHref.appendChild(img);
	return enlaceHref;
}

// *Return implicito ES6
const giftTendenciaPrint = () => dataAPI.map(gift => makeImg(gift));

const getObserverWithAPI = () => {
	
	const lastArrIndex = dataAPI.pop();
	const lastImg = makeImg(lastArrIndex);
	
	listOnlyImagen.append(...giftTendenciaPrint(dataAPI))
	listOnlyImagen.append(lastImg);

	getObserver(lastImg);
}

