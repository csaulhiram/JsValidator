class JSValidator {

    status = true;

    constructor(formId) {
        this.setForm(formId);
        this.setInputs();
        this.parseInputs();

    }

    // Tomamos el id del formulario 
    setForm(formId) {
        this.form = document.getElementById(formId);
        console.log(this.form.id);
    }

    // Seleccionar todos los inputs
    setInputs() {
        this.inputs = document.querySelectorAll(`#${ this.form.id} .jsValidator`);
    }

    // Procesar inputs 
    parseInputs() {
        // Por cada input haremos
        this.inputs.forEach(input => {
            this.appendErrorsTag(input);
        });
    }

    // Crear etiqueta span.error-msg
    appendErrorsTag(input) {

        let parent = input.parentNode;

        let span = document.createElement('span');
        span.setAttribute('class', 'error-msg');

        parent.appendChild(span);
    }

    // Método que se encarga de la validación
    validateForm() {
        this.form.addEventListener('submit', (e) => {


            this.inputs.forEach(input => {
                this.validateInput(input);
            });

            if (!this.status) {
                // Prevenir el envío del formulario
                e.preventDefault();
                console.log('Ha ocurrido un error de validación');

            } else {
                console.log('El formulario se ha enviado');
            }

        });
    }

    //  Valida los inputs
    validateInput(input) {

        /*
            Cada input en el html tiene un data set (data-validators ="validaciones por inputs")
            este método las capturará para dar alguna repsuesta en el span error.
        */
        let validators = input.dataset.validators;

        // si validators no está vacío  entonces separaremos los datasets en un array
        // cada elemento corresponde a una validación del dataset
        if (validators !== undefined) {
            validators = validators.split(' ');

            validators.forEach(validator => {

                /*
                    Si el validador es required, su método de validación sería: _required(input)
                    Si el validador es length, su método de validación sería: _length(input)
                */

                this[`_${validator}`](input);
            });
        }
    }

    // Método que inicializará todo
    init() {
        this.validateForm();

        return this;
    }

}

// Lógic de la validación
JSValidator.prototype._required = function(input) {

    // Captura el valor del input
    let value = input.value;

    // Mensaje de error
    let msg = 'Este campo es requerido';

    // Si el campo va vacío, es un error
    if (value.trim() === '' || value.length - 1) {
        // Evitamos que el mensaje se envíe
        this.status = false;

        // Colocamos un mensaje de error al siguiente elemento 
        // después de nuestro input
        let span = input.nextElementSibling;

        // Mostramos el mensaje de error
        span.innerHTML += (msg + '<br/>');
    }
}

JSValidator.prototype._length = function(input) {
    //console.log('Se está validando un input para _length');
}

JSValidator.prototype._email = function(input) {
    //console.log('Se está validando un input para _email');
}