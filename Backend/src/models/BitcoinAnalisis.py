import os
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

# Acceso al Dataset
os.chdir("/Applications/MAMP/htdocs/BigDataProject/Backend/src")
df = pd.read_csv("BTC_USD.csv")
fechas = pd.to_datetime(df['Date'])  # Suponiendo que la columna de fecha se llama 'Date'
datos = df[['Open', 'High', 'Low', 'Close', 'Volume']].values
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(datos)

def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i + seq_length])
        y.append(data[i + seq_length, 3])  # Precio de cierre
    return np.array(X), np.array(y)

# Guardar el modelo y el scaler
def guardar_modelo(modelo, scaler):
    # Guardar el modelo
    with open('modelo_lstm.pkl', 'wb') as f:
        pickle.dump(modelo, f)

    # Guardar el scaler
    with open('scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)

# Cargar el modelo y el scaler desde archivos .pkl
def cargar_modelo():
    # Cargar el modelo
    with open('modelo_lstm.pkl', 'rb') as f:
        modelo = pickle.load(f)
    
    # Cargar el scaler
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)

    return modelo, scaler

def entrenar_modelo():
    seq_length = 60
    X, y = create_sequences(scaled_data, seq_length)

    # Dividir en conjuntos de entrenamiento y prueba
    split = int(0.8 * len(X))
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]

    # Construcción del modelo LSTM
    model = Sequential()
    model.add(LSTM(100, return_sequences=True, input_shape=(seq_length, 5)))
    model.add(Dropout(0.2))
    model.add(LSTM(100, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(50))
    model.add(Dense(1))

    # Compilación y entrenamiento del modelo
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, y_train, epochs=30, batch_size=16)

    # Guardar el modelo entrenado y el scaler
    guardar_modelo(model, scaler)
    
    return model, scaler

# 1. Función para obtener el histórico de precios
def obtener_datos_historicos():
    precios_historicos = scaler.inverse_transform(scaled_data)[:, 3]  # Precio de cierre
    df_historico = pd.DataFrame({'Fecha': fechas, 'Precio': precios_historicos})
    return df_historico

# 2. Predicción de un día adelante con fecha actual
def predecir_a_futuro_1_dia(modelo, scaler):
    ultimo_dato = scaled_data[-60:]
    prediccion = modelo.predict(np.array([ultimo_dato]))
    prediccion_invertida = scaler.inverse_transform(
        np.concatenate((ultimo_dato[-1, :-1].reshape(1, -1), prediccion), axis=1)
    )[:, -1]
    
    # Obtener la fecha actual
    fecha_prediccion = pd.Timestamp.today().normalize()  # Normalizar a la medianoche del día actual
    
    # Formatear los datos para enviar al frontend
    resultado = pd.DataFrame({
        'Fecha': [fecha_prediccion],
        'Precio': prediccion_invertida
    })
    return resultado

# 3. Predicción de siete días adelante con fecha actual
def predecir_a_futuro_7_dias(modelo, scaler):
    secuencia_actual = scaled_data[-60:]  # Tomar los últimos 60 datos como entrada
    predicciones_futuras = []
    fecha_inicial = pd.Timestamp.today().normalize()  # Normalizar a la medianoche del día actual

    for i in range(7):  # Para los próximos 7 días
        prediccion = modelo.predict(np.array([secuencia_actual]))  # Predicción de los siguientes valores
        prediccion_invertida = scaler.inverse_transform(
            np.concatenate((secuencia_actual[-1, :-1].reshape(1, -1), prediccion), axis=1)
        )[:, -1]
        
        predicciones_futuras.append(prediccion_invertida[0])

        # Actualizar la secuencia para el próximo ciclo (concatenar la predicción)
        # Asegurarse de que la predicción sea agregada de manera correcta a la secuencia
        # Convertir prediccion a 2D (1, n) si es necesario
        prediccion = prediccion.reshape(1, -1)  # Convertir la predicción a 2D (1, n)
        secuencia_actual = np.roll(secuencia_actual, -1, axis=0)  # Mover todo un paso hacia la izquierda
        secuencia_actual[-1] = np.concatenate((secuencia_actual[-1, :-1], prediccion[:, 0]), axis=0)  # Reemplazar el último valor por la predicción

    # Crear fechas para las predicciones futuras
    fechas_prediccion = [fecha_inicial + pd.Timedelta(days=i) for i in range(1, 8)]

    # Formatear los datos para enviarlos al frontend
    resultado = pd.DataFrame({
        'Fecha': fechas_prediccion,
        'Precio': predicciones_futuras
    })
    return resultado
