// funcion una vez que carga el dom 

document.addEventListener('DOMContentLoaded', function() {

    const opciones = document.querySelector('#tipo');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //arreglo de abecedario

    const primero = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const segundo = ["f" , "g" , "h" , "i" , "j" , "k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","a", "b", "c", "d", "e"]

    //funcion para cifrar el mensaje

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    formulario.addEventListener('submit', cifrarMensaje);

    function cifrarMensaje(e) {

        //comprobar si es cifrar o descifrar
        e.preventDefault();


        if(opciones.value === 'cifrar') {
            //cifrar
            let mensaje = inputMensaje.value.toLowerCase();
            console.log(mensaje);
            let cifrado = '';
            let index = 0;

            //cifrar buscando la letra en el primer arreglo y luego buscar la poscicion del segundo 
            for(let i = 0; i < mensaje.length; i++) {
                //validar para espacio y cifrar 
                if(mensaje[i] === ' ') {
                    cifrado += ' ';
                } else {
                    index = primero.indexOf(mensaje[i]);
                    cifrado += segundo[index];
                }

            }
            
            limpiarHTML();

            const contenedor = document.querySelector('#resultado');
            const res = document.createElement('p');

            res.innerHTML = cifrado;
            contenedor.appendChild(res);

            limpiarAlerta(formulario);

        } else if (opciones.value === 'descifrar') {
            //descifrar
            let mensaje = inputMensaje.value.toLowerCase();
            let cifrado = '';
            let index = 0;

            for(let i = 0; i < mensaje.length; i++) {
                //validar para espacio y cifrar 
                if(mensaje[i] === ' ') {
                    cifrado += ' ';
                } else {
                    index = segundo.indexOf(mensaje[i]);
                    cifrado += primero[index];
                }

            }
            
            limpiarHTML();

            const contenedor = document.querySelector('#resultado');
            const res = document.createElement('p');

            res.innerHTML = cifrado;
            contenedor.appendChild(res);

            limpiarAlerta(formulario);
        }
        else{
            mostrarAlerta('Selecciona una opcion', formulario);
        }
    }


    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
       
        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }


    function limpiarHTML() {
        // Leer el elemento Resultado
        const contenedor = document.querySelector('#resultado');
    
        // limpiar los resultados anteriores
        while(contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }

    function resetFormulario() {
        // reiniciar el objeto
        formulario.reset();
    }

});