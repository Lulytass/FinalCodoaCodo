from app import db,ma,app

# defino las tablas
class Usuario(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    email=db.Column(db.String(100))
    contrasenia=db.Column(db.String(100))
    pregunta=db.Column(db.String(100))
    respuesta=db.Column(db.String(100))
    def __init__(self,nombre,email,contrasenia,pregunta,respuesta):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.email=email
        self.contrasenia=contrasenia
        self.pregunta=pregunta
        self.respuesta=respuesta

with app.app_context():
    db.create_all()  # aqui crea las tablas

class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','email','contrasenia','pregunta','respuesta')

usuario_schema=UsuarioSchema()            # El objeto producto_schema es para traer un producto
usuarios_schema=UsuarioSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

