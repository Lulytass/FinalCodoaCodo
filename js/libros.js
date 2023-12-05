const { createApp } = Vue

  createApp({
    data() {
      return {
            libros:[],
            url:'https://luciatassi.pythonanywhere.com/libros',
            error:false,
            cargando:true,
            id:0,
            nombre:"", 
            imagen:"",
            escritor:"", 
            estrellas:0,
            genero:"", 
            editorial:"",
            libro:"", 
            resumen:"",
            resumenLibro: null,
        }
    },
    methods:{
        fetchdata(url){
            fetch(url)
                .then(resp => resp.json())
                .then(data =>{
                    this.libros = data;  
                    this.cargando = false;   
                }) 
                .catch(e => {
                    console.error(e);
                    this.error = true;
                })
        },
        eliminar(idLibro){
            const url = this.url+'/'+ idLibro;
            var opciones = {
                method: 'DELETE',
            }
            fetch(url, opciones)
            .then(res => res.json())
            .then(res => {
                location.reload();
            })
        }
        ,
        crearRegistro(){
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
            .then(function () {
                alert("Registro grabado")
                window.location.href = "./libros.html";  // recarga productos.html
            })
            .catch(err => {
                console.error(err);
                alert("Error al crear el nuevo registro")  // puedo mostrar el error tambien
            }) 
                 
        },
        mostrarResumen(libro) {
            this.resumenLibro = libro;
            // Abre el modal
            new bootstrap.Modal(document.getElementById('modalResumen')).show();
        }, 
    },
    created(){
        this.fetchdata(this.url)

        
    }
  }).mount('#app')