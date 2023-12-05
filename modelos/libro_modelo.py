from app import db,ma,app

# defino las tablas
class Libro(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    escritor=db.Column(db.String(100))
    estrellas=db.Column(db.Integer)
    imagen=db.Column(db.String(400))
    genero=db.Column(db.String(100))
    editorial=db.Column(db.String(100))
    libro=db.Column(db.String(100))
    resumen=db.Column(db.String(500))
    def __init__(self,nombre,escritor,estrellas,imagen,genero,editorial,libro,resumen):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.escritor=escritor
        self.estrellas=estrellas
        self.imagen=imagen
        self.genero=genero
        self.editorial=editorial
        self.libro=libro
        self.resumen=resumen

with app.app_context():
    db.create_all()  # aqui crea las tablas

class LibroSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','escritor','estrellas','imagen','genero','editorial','libro','resumen') 

libro_schema=LibroSchema()            # El objeto producto_schema es para traer un producto
libros_schema=LibroSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto
