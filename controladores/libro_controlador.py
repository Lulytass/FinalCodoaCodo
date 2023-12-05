#controlador es el intermediario entre la vista y el modelo
#aqui ocurre la logic del programa

from app import *   
from flask import jsonify,request

from modelos.libro_modelo import *  

# crea los endpoint o rutas (json)
@app.route('/libros',methods=['GET'])
def get_Libros():
    all_libros=Libro.query.all()         # el metodo query.all() lo hereda de db.Model
    result=libros_schema.dump(all_libros)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/libros/<id>',methods=['GET'])
def get_libro(id):
    libro=Libro.query.get(id)
    return libro_schema.jsonify(libro)   # retorna el JSON de un producto recibido como parametro


@app.route('/libros/<id>',methods=['DELETE'])
def delete_libro(id):
    libro=Libro.query.get(id)
    db.session.delete(libro)
    db.session.commit()                     # confirma el delete
    return libro_schema.jsonify(libro) # me devuelve un json con el registro eliminado


@app.route('/libros', methods=['POST']) # crea ruta o endpoint
def create_libro():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    escritor=request.json['escritor']
    estrellas=request.json['estrellas']
    imagen=request.json['imagen']
    genero=request.json['genero']
    editorial=request.json['editorial']
    libro=request.json['libro']
    resumen=request.json['resumen']
    new_libro=Libro(nombre,escritor,estrellas,imagen,genero,editorial,libro,resumen)
    db.session.add(new_libro)
    db.session.commit() # confirma el alta
    return libro_schema.jsonify(new_libro)


@app.route('/libros/<id>' ,methods=['PUT'])
def update_libro(id):
    libro=Libro.query.get(id)
 
    libro.nombre=request.json['nombre']
    libro.escritor=request.json['escritor']
    libro.estrellas=request.json['estrellas']
    libro.imagen=request.json['imagen']
    libro.genero=request.json['genero']
    libro.editorial=request.json['editorial']
    libro.libro=request.json['libro']
    libro.resumen=request.json['resumen']

    db.session.commit()    # confirma el cambio
    return libro_schema.jsonify(libro)    # y retorna un json con el producto
 