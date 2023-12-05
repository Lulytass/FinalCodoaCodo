const { createApp } = Vue

  createApp({
    data() {
      return {
            usuarios:[],
            url:'https://luciatassi.pythonanywhere.com/usuarios',
            error:false,
            email:"",
            id:0,
            password:"",
            confirmarPassword:"",
            respuesta:"",
            pregunta:"",
            modalRec: ""
        }
    },
    methods:{
        fetchdata(url){
            fetch(url)
                .then(resp => resp.json())
                .then(data =>{
                    this.usuarios = data;   
                }) 
                .catch(e => {
                    console.error(e);
                    this.error = true;
                })
        },
        login() {
            // Verificar campos vacíos
            if (!this.email || !this.password) {
                alert("Por favor, ingrese el email y la contraseña.");
                return;
            }

            // Convertir a minúsculas para comparación sin importar mayúsculas/minúsculas
            const emailLowerCase = this.email.toLowerCase();
            const passwordLowerCase = this.password.toLowerCase();

            // variable para indicar si se encontró una coincidencia
            let found = false;

            // Iterar sobre los usuarios hasta encontrar una coincidencia
            for (const usuario of this.usuarios){
                if (usuario.email.toLowerCase() === emailLowerCase && usuario.contrasenia.toLowerCase() === passwordLowerCase) {
                    found = true;
                    break;  // Detener el bucle cuando se encuentra una coincidencia
                }
            }

            // Mostrar el mensaje de acuerdo con la bandera
            if (found) {
                window.location.href = "./libros.html";
            } else {
                alert('Email o Contraseña incorrectos');
            }
        },
        recuperarContraseña(){
            // Verificar campos vacíos
            if (!this.email || !this.pregunta || !this.respuesta) {
                alert("Por favor, complete todos los campos.");
                return;
            }

            // Convertir a minúsculas para comparación sin importar mayúsculas/minúsculas
            const emailLowerCase = this.email.toLowerCase();
            const repuestaLowerCase = this.respuesta.toLowerCase();
            // variable para indicar si se encontró una coincidencia
            let found = false;

            // Iterar sobre los usuarios hasta encontrar una coincidencia
            for (const usuario of this.usuarios){
                if (usuario.email.toLowerCase() === emailLowerCase && usuario.pregunta === this.pregunta && usuario.respuesta.toLowerCase() === repuestaLowerCase) {
                    found = true;
                    this.nombre = usuario.nombre
                    this.id = usuario.id
                    break;  // Detener el bucle cuando se encuentra una coincidencia
                }
            }

            if (found) {
                // Obtener la instancia del modal actual
                this.modalRec = new bootstrap.Modal(document.getElementById('recuperarModal'));

                // Cerrar el modal actual
                this.modalRec.hide();
                // Abrir el nuevo modal usando funciones de Bootstrap 
                let modalNuevaContraseña = new bootstrap.Modal(document.getElementById('nuevaContraseñaModal'));
                modalNuevaContraseña.show();           
            }else{
                alert('Los datos ingreados no son correctos');
                window.location.href = "./index.html";
            }

        },
        guardarNuevaContraseña(){
            // Verificar campos vacíos
            if ( !this.password || !this.confirmarPassword ) {
                alert("Por favor, complete todos los campos.");
                return;
            }

            if ( this.password !== this.confirmarPassword ) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            let usuario = {
                nombre: this.nombre, 
                pregunta: this.pregunta,
                respuesta: this.respuesta, 
                email: this.email,
                contrasenia: this.password,
                id: this.id 
            }
            var options = {
                body:JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/" + this.id, options)
            .then(function () {
                alert("Contraseña actualizada correctamente")
                window.location.href = "./index.html"; 
            })
            .catch(err => {
                console.error(err);
                alert("Error al cambiar la contraseña") 
            }) 
        }
    },
    created(){
        this.fetchdata(this.url)
    }
  }).mount('#app')