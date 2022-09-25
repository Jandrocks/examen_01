// se utilizo de la forma explicada en la ayudantia..

import { cargaTendenciaGift } from "./tendencia.js";

const getViewPort = ([e]) => {
	const { isIntersecting, target } = e;

	if(isIntersecting){
		cargaTendenciaGift();
		observer.unobserve(target)
	}
}

const observer = new IntersectionObserver(getViewPort);

export const getObserver = nodeHTML => {
	observer.observe(nodeHTML);
}