import os

import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        code = request.form["code"]
        bug = request.form["bug"]
        gherkin = request.form["gherkin"]
        prompt = f"""Based on the the error message, create a dictionary using this template:\
        issue_dict = {{"project": {{"id": 53246}},\n"summary": "",\n"description": "",\n"issuetype": {{"": ""}}\n\
        }}, where project id is random number, 'summary' has the summary of the error, and the 'description' has error\
        location and change in code (detailed explanation followed by full fixed code) to fix it:\
        Code tested: {code}\nError message: {bug}\nGherkin: {gherkin}"""

        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0.6,
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    print(result)
    return render_template("index.html", result=result)





