const { createApp } = Vue

  createApp({
    data() {
      return {
            error:false,
            id:new URLSearchParams(window.location.search).get('id') || 0,
            nombre:"", 
            imagen:"",
            escritor:"", 
            estrellas:0,
            genero:"", 
            editorial:"",
            libro:"", 
            resumen:"",
            url:"",
        }
    },
    methods:{
        fetchData(url){
            fetch(url)
                .then(resp => resp.json())
                .then(data =>{
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.escritor =  data.escritor;
                    this.estrellas = data.estrellas;
                    this.genero = data.genero;
                    this.editorial = data.editorial;
                    this.libro = data.libro;
                    this.resumen = data.resumen;
                }) 
                .catch(e => {
                    console.error(e);
                    this.error = true;
                })
        },
        modificar(){
            let libro = {
                nombre: this.nombre, 
                imagen: this.imagen,
                escritor: this.escritor, 
                estrellas: this.estrellas,
                genero: this.genero, 
                editorial: this.editorial,
                libro: this.libro, 
                resumen: this.resumen,
            }
            var options = {
                body:JSON.stringify(libro),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
            .then(function () {
                alert("Registro Modificado")
                window.location.href = "./libros.html";  // recarga productos.html
            })
            .catch(err => {
                console.error(err);
                alert("Error al modificar el registro")  // puedo mostrar el error tambien
            }) 
                 
        },
    },
    created(){
        this.url = 'https://luciatassi.pythonanywhere.com/libros/' + this.id;
        this.fetchData(this.url);
        
    }
  }).mount('#app')  