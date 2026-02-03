import pandas as pd
import sys
import json
import os
import math
file_path = sys.argv[1]
if file_path.endswith(".csv"):
    df = pd.read_csv(file_path)
else:
    df = pd.read_excel(file_path)
if df.empty:
    raise ValueError("Dataset is empty")

numeric_df = df.select_dtypes(include="number")
if numeric_df.shape[1] == 0:
    raise ValueError("No numeric columns found for analysis")
def clean_value(value):
    if value is None:
        return None
    if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
        return None
result = {
    "meta": {
        "file_name": os.path.basename(file_path),
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": list(df.columns)
    },
    "missing_values": {},
    "numeric_summary": {},
    "charts": {}
}
for col, count in df.isnull().sum().to_dict().items():
    result["missing_values"][col] = int(count)
for col in numeric_df.columns:
    result["numeric_summary"][col] = {
        "sum": clean_value(float(df[col].sum())),
        "mean": clean_value(float(df[col].mean())),
        "min": clean_value(float(df[col].min())),
        "max": clean_value(float(df[col].max()))
    }
charts = {}
for col in numeric_df.columns:
    charts[col + "_distribution"] = {
        "type": "histogram",
        "values": df[col].dropna().tolist()
    }
categorical_columns = df.select_dtypes(include=["object", "string"]).columns

for col in categorical_columns:
    value_counts = df[col].value_counts().head(10)
    charts[col + "_counts"] = {
        "type": "bar",
        "labels": value_counts.index.tolist(),
        "values": value_counts.values.tolist()
    }
result["charts"] = charts
print(json.dumps(result, allow_nan=False))
