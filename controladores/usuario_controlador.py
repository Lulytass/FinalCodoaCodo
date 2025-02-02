#controlador es el intermediario entre la vista y el modelo
#aqui ocurre la logic del programa

from app import *   
from flask import jsonify,request

from modelos.usuario_modelo import *  

# crea los endpoint o rutas (json)
@app.route('/usuarios',methods=['GET'])
def get_Usuarios():
    all_usuarios=Usuario.query.all()         # el metodo query.all() lo hereda de db.Model
    result=usuarios_schema.dump(all_usuarios)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/usuarios/<id>',methods=['GET'])
def get_usuario(id):
    usuario=Usuario.query.get(id)
    return usuario_schema.jsonify(usuario)   # retorna el JSON de un producto recibido como parametro


@app.route('/usuarios/<id>',methods=['DELETE'])
def delete_usuario(id):
    usuario=Usuario.query.get(id)
    db.session.delete(usuario)
    db.session.commit()                     # confirma el delete
    return usuario_schema.jsonify(usuario) # me devuelve un json con el registro eliminado


@app.route('/usuarios', methods=['POST']) # crea ruta o endpoint
def create_usuario():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    email=request.json['email']
    contrasenia=request.json['contrasenia']
    pregunta=request.json['pregunta']
    respuesta=request.json['respuesta']
    new_usuario=Usuario(nombre,email,contrasenia,pregunta,respuesta)
    db.session.add(new_usuario)
    db.session.commit() # confirma el alta
    return usuario_schema.jsonify(new_usuario)


@app.route('/usuarios/<id>' ,methods=['PUT'])
def update_usuario(id):
    usuario=Usuario.query.get(id)
 
    usuario.nombre=request.json['nombre']
    usuario.email=request.json['email']
    usuario.contrasenia=request.json['contrasenia']
    usuario.pregunta=request.json['pregunta']
    usuario.respuesta=request.json['respuesta']

    db.session.commit()    # confirma el cambio
    return usuario_schema.jsonify(usuario)    # y retorna un json con el producto
 