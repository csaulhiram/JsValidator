class JSValidator {

    constructor(form_id) {
        this.setForm(form_id);
        this.setInputs();
        this.parseInputs();
    }
    // Obtenemos el formulario
    setForm(formId) {
        this.form = document.getElementById(formId);
    }

    setInputs() {
        // Selecciona todos los elementos que estén en este formulario
        // y que tengan la clase de jsValidator
        this.inputs = document.querySelectorAll(`#${this.form.id} .jsValidator`);
    }

    //Analizaremos cada uno de los inputs
    parseInputs() {
        this.inputs.forEach(input => {
            this.appendErrorsTag(input);
        });
    }

    appendErrorsTag(input) {
        // Insertamos un span después del contenedor padre (div)
        let parent = input.parentNode;
        let span = document.createElement('span');
        span.setAttribute("class", "error-msg");
        parent.appendChild(span);
    }

    validateForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.inputs.forEach(input => {
                console.log('Input validado');
            });
        });
    }

    validateInputs() {
        this.inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.resetValidation();//Elimita errores antes de enviar el formulario

                this.validateInputs(input);
            });
        });
    }

    valdiateInput(input) {

    }


    init() {
        this.validateForm();
        this.validateInputs();
        return this;
    }

}