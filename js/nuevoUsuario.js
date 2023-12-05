const { createApp } = Vue

  createApp({
    data() {
      return {
            usuarios:[],
            url:'https://luciatassi.pythonanywhere.com/usuarios',
            error:false,
            nombre:"",
            pregunta:"",
            respuesta:"",
            email:"",
            password:"",
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
        nuevoUsuario() {
            // Verificar campos vacíos
            if (!this.email || !this.password || !this.nombre || !this.respuesta) {
                alert("Por favor, complete todos los campos.");
                return;
            }

            // Convertir a minúsculas para comparación sin importar mayúsculas/minúsculas
            const emailLowerCase = this.email.toLowerCase();

            // Iterar sobre los usuarios hasta encontrar una coincidencia
            for (const usuario of this.usuarios){
                if (usuario.email.toLowerCase() === emailLowerCase) {
                    alert("Ya existe un usuario con ese email.");
                    return;
                }
            }

            let usuario = {
                nombre: this.nombre, 
                pregunta: this.pregunta,
                respuesta: this.respuesta, 
                email: this.email,
                contrasenia: this.password 
            }
            var options = {
                body:JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
            .then(function () {
                alert("Usuario creado exitosamente")
                window.location.href = "./index.html"; 
            })
            .catch(err => {
                console.error(err);
                alert("Error al crear el nuevo usuario") 
            }) 
        }
    },
    created(){
        this.fetchdata(this.url)

        
    }
  }).mount('#app')