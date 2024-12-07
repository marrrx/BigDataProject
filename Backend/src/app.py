from flask import Flask, jsonify, make_response
from flask_cors import CORS
from models.BitcoinAnalisis import (
    entrenar_modelo,
    obtener_datos_historicos,
    predecir_a_futuro_1_dia,
    predecir_a_futuro_7_dias,
    cargar_modelo,  
)

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

try:
    modelo, scaler = cargar_modelo()
    print("Modelo cargado exitosamente.")
except FileNotFoundError:
    print("No se encontró el modelo, entrenando nuevo modelo...")
    modelo, scaler = entrenar_modelo()


@app.route("/historico", methods=["GET"])
def obtener_historico():
    df_historico = obtener_datos_historicos()
    response = make_response(
        jsonify({"historico": df_historico.to_dict(orient="records")})
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/predecir_1_dia", methods=["GET"])
def predecir_1_dia():
    prediccion_1_dia = predecir_a_futuro_1_dia(modelo, scaler)
    prediccion_1_dia_dict = prediccion_1_dia.to_dict(orient="records")[0]  
    response = make_response(
        jsonify({"prediccion1": {"fecha": prediccion_1_dia_dict['Fecha'], "precio": prediccion_1_dia_dict['Precio']}})
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/predecir_7_dias", methods=["GET"])
def predecir_7_dias():
    prediccion_7_dias = predecir_a_futuro_7_dias(modelo, scaler)
    prediccion_7_dias_dict = prediccion_7_dias.to_dict(orient="records") 
    response = make_response(
        jsonify({"prediccion7": [{"Fecha": item['Fecha'], "Precio": item['Precio']} for item in prediccion_7_dias_dict]})
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response



if __name__ == "__main__":
    app.run(debug=True)
