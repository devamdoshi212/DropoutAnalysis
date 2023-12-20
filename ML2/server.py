from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

app = Flask(__name__)
pipeline = None
df_train = None
X_train = None


def add_to_csv(data: pd.DataFrame):
    data.to_csv("temp.csv", mode="a", index=False, header=False)
    df = pd.read_csv("temp.csv")
    # print(df.shape[0])
    if df.shape[0] >= 10:
        df.to_csv("pratham.csv", mode="a", index=False, header=False)
        template = pd.read_csv("./template.csv")
        template.to_csv("temp.csv", mode="w", index=False, header=True)
        train_model()


def train_model():
    global pipeline
    global df_train
    global X_train
    df_train = pd.read_csv("pratham.csv")
    df_train = df_train.drop("Predict", axis=1)
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
    # X_train = df_train.drop("Reason", axis=1)
    X_train = pd.get_dummies(
        df_train.drop("Reason", axis=1), columns=categorical_columns
    )
    y_train = df_train["Reason"]
    # preprocessor = ColumnTransformer(
    #     transformers=[("onehot", OneHotEncoder(), categorical_columns)],
    #     remainder="passthrough",
    # )
    pipeline = Pipeline([("classifier", KNeighborsClassifier(n_neighbors=10))])
    # pipeline = Pipeline(
    #     [
    #         ("preprocessor", preprocessor),
    #         ("classifier", RandomForestClassifier(random_state=42)),
    #     ]
    # )
    # Train the model
    pipeline.fit(X_train, y_train)


def predict_model(data: pd.DataFrame):
    global pipeline
    global df_train
    global X_train
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
    X_test = pd.get_dummies(data, columns=categorical_columns).reindex(
        columns=X_train.columns, fill_value=False
    )
    y_pred = None

    try:
        y_pred = pipeline.predict(X_test)
        prob = pipeline.predict_proba(X_test)
        distances, indices = pipeline.named_steps["classifier"].kneighbors(
            X_test, n_neighbors=10
        )
        prediction_probabilities = pd.DataFrame(
            pipeline.named_steps["classifier"].classes_, columns=["reason"]
        )
        parray = []
        for i in prob[0]:
            parray.append(i * 100)
        prediction_probabilities["probability"] = prob[0]
        obj = prediction_probabilities.to_dict(orient="records")
        obj = [
            {"reason": d["reason"], "probability": d["probability"] * 100}
            for d in obj
            if d["probability"] > 0
        ]
        obj = sorted(obj, key=lambda x: x["probability"])

    except Exception as err:
        print(err)
        return ["NO REASON FOUND", [{"reason": "NO REASON FOUND", "probability": 0}]]
    else:
        return [y_pred, obj]


train_model()


@app.route("/")
def home():
    return "HELLO"


@app.route("/newData", methods=["POST"])
def newData():
    newDict = {}
    oldDict = request.get_json()
    # print(oldDict)
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
    [message, probability] = predict_model(data)
    # print(type(message))
    if isinstance(message, np.ndarray):
        return jsonify({"message": message.tolist()[0], "probability": probability})
    else:
        return jsonify({"message": message})


if __name__ == "__main__":
    app.run()
