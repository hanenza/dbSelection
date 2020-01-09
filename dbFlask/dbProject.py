import json
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
import simplejson as json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def get_uml_data(js):
    class_dictionary={}
    classes_names=[]
    links=[]
    for cell in js["cells"]:
        if(cell["type"]=="uml.Class"):
            if(not( cell["position"]["x"]==1123 and cell["position"]["y"]==0)):
                class_dictionary[cell["id"]]=cell["name"]
                classes_names.append(cell["name"])
        else:
            links.append(cell)
    answer=[]
    answer.append(classes_names)
    for i in range(0,len(classes_names)):
        answer.append([0]*len(classes_names))
    for link in links:
        print("link")
        x=answer[0].index(class_dictionary[link["source"]["id"]])
        y=answer[0].index(class_dictionary[link["target"]["id"]])
        if(class_dictionary[link["source"]["id"]]!=class_dictionary[link["target"]["id"]]):
            answer[x+1][y]=answer[x+1][y]+1
            answer[y+1][x]=answer[y+1][x]+1
        # self link
        else:
            answer[x+1][y]=answer[x+1][y]+1

    jsonAnswer = {"data": answer}
    return jsonAnswer

@app.route("/",methods=['GET','POST'])
@cross_origin()
def helloWorld():
    answer=""
    try:
        requestData=request.data
        requestData=requestData.decode('utf-8')
        requestData=json.loads(requestData)
        answer=get_uml_data(requestData)
    except:
        pass
    return answer

if __name__ == '__main__':
    app.run(debug=True)