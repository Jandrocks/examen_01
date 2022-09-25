//logica del boton buscar y los botones de localSotage

const botonBuscar = document.querySelector(".btn-primario");
const inputBuscar = document.querySelector(".input_buscar");
const textTitulo = document.querySelector(".titulo");

import { alerta } from './sweetalert.js'

const cargaGift = async (inputBuscar) => {
    try {
      const getGift = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=BidAdtjx9l11Yw6FiLCd7Euz7qTUHYyf&limit=20&q=${inputBuscar}`
      );
      if (getGift.status === 200) {
        const getGiftjs = await getGift.json();
        console.log(getGiftjs.data.length)
        if(getGiftjs.data.length === 0){
          alerta();
        }else{
        gifPrint(getGiftjs);
        cambiaTitulo(textTitulo, inputBuscar);
        registraLocalStorage(inputBuscar);
        getHistory();
        } 
      } else if (getGift.status === 401) {
        console.log("DATOS ENVIADOS INCORRECTOS");
      } else if (getGift.status === 404) {
        console.log("NO SE PUDO CONECTAR AL SERVIDOR - URL ERRONEA");
      } else {
        console.log("OCURRIO UN ERROR - NO ES ERROR 401 - 404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  botonBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    cargaGift(inputBuscar.value)    
  });


  function gifPrint(getGiftjs) {
    console.log(getGiftjs.data);
    const array = getGiftjs.data;
    const arrayHtml = [];
  
    array.map((gift) => {
      arrayHtml.push({
        id: gift.id,
        title: gift.title,
        url: gift.images.downsized_medium.url,
      });
    });

    cargaGiftHtml(arrayHtml)
  }
  
  const cargaGiftHtml = async (arrayHtml) => {
    let agregadosHtml = "";
    arrayHtml.forEach( giftH => {
      agregadosHtml += `<img src=${giftH.url} class="img-gift" alt="...">`;
    });
    document.getElementById("contenedor_gift").innerHTML = agregadosHtml;

  };
  
  function cambiaTitulo(textTitulo, inputBuscar ){ 
    textTitulo.innerHTML = `<div class="titulo">Gift ${inputBuscar} </div>`
  }

  function registraLocalStorage(inputBuscar){
    const resultado = localStorage.getItem("historial")
    if (resultado === null){
      const registroLocal =  [
        { resgistro: inputBuscar }
      ]
      localStorage.setItem( "historial" , JSON.stringify(registroLocal) );
    }else{
    const jsonResult = JSON.parse(resultado)   

    jsonResult.push({
      resgistro: inputBuscar
    })

    localStorage.setItem( "historial" , JSON.stringify(jsonResult) );
    }    
  }

  export function getHistory(){
    const resulHistory = localStorage.getItem("historial")
    const resulHistoryJs = JSON.parse(resulHistory)  
    let largo = resulHistoryJs.length;
    const resultHtml = resulHistoryJs.slice(-3 , largo)
    cargaHistorial(resultHtml) 
  }

  const cargaHistorial = async (resultHtml) => {
    let agregadosHtml = '';
    let contador = 0
    resultHtml.forEach(historial => {
      contador ++
      agregadosHtml += `<li class="history_unitario" id="history_unitario${contador}">${historial.resgistro}</li>`;
     });
    document.getElementById('history_busqueda').innerHTML = agregadosHtml;
  }



export {cargaGift}

