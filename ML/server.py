from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

app = Flask(__name__)
pipeline = None


def add_to_csv(data: pd.DataFrame):
    data.to_csv("temp.csv", mode="a", index=False, header=False)
    df = pd.read_csv("temp.csv")
    if df.shape[0] == 10:
        df.to_csv("new.csv", mode="a", index=False, header=False)
        template = pd.read_csv("./template.csv")
        template.to_csv("temp.csv", mode="w", index=False, header=False)
        train_model()


def train_model():
    global pipeline
    df_train = pd.read_csv("new.csv")
    categorical_columns = [
        "Gender",
        "District",
        "State",
        "Taluka",
        "City",
        "School_name[0]",
        "City_type",
        "School_medium",
        "ParentOccupation",
        "ParentMaritalStatus",
        "Family_income",
        "Cast",
    ]
    X_train = df_train.drop("Reason", axis=1)
    y_train = df_train["Reason"]
    preprocessor = ColumnTransformer(
        transformers=[("onehot", OneHotEncoder(), categorical_columns)],
        remainder="passthrough",
    )
    pipeline = Pipeline(
        [
            ("preprocessor", preprocessor),
            ("classifier", RandomForestClassifier(random_state=42)),
        ]
    )
    # Train the model
    pipeline.fit(X_train, y_train)


def predict_model(data: pd.DataFrame):
    global pipeline
    y_pred = None
    try:
        y_pred = pipeline.predict(data)
    except ValueError:
        return "NO REASON FOUND"
    else:
        return y_pred


train_model()


@app.route("/")
def home():
    return "HELLO"


@app.route("/newData", methods=["POST"])
def newData():
    newDict = {}
    oldDict = request.get_json()
    for x in oldDict:
        newDict[x] = [oldDict[x]]
    data = pd.DataFrame(newDict)
    add_to_csv(data)
    return jsonify({"message": "Data Added Successfully"})


@app.route("/trainModel")
def trainModel():
    train_model()
    return jsonify({"message": "Model Trained Successfully"})


@app.route("/predictModel", methods=["POST"])
def predictModel():
    newDict = {}
    oldDict = request.get_json()
    for x in oldDict:
        newDict[x] = [oldDict[x]]
    data = pd.DataFrame(newDict)
    message = predict_model(data)
    print(type(message))
    if isinstance(message, np.ndarray):
        return jsonify({"message": message.tolist()[0]})
    else:
        return jsonify({"message": message})


if __name__ == "__main__":
    app.run()
