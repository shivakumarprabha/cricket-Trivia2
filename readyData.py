from bs4 import BeautifulSoup
import urllib2
import json

url = "http://www.jagranjosh.com/articles/cricket-general-knowledge-quiz-1314792254-1"
content = urllib2.urlopen(url).read()
soup = BeautifulSoup(content)
qna = soup.find("div", { "id" : "articleDetail" })
paras = qna.findAll("p")
data = []
count=0
options = []
for p in paras[2:-2]:
    if "GK Quiz" not in p.text:
        if count%6 == 0:
            question = p.text.split(' ', 1)[1]
        elif count%6 in range(1,5):
            options.append(p.text.split(' ', 1)[1])
        else:
            answer = p.text.split(' ',1)[1]
            count = -1
            one_data = {"question": question, "answer": answer, "options": options}
            options=[]
            data.append(one_data)
        count+=1
with open('data.json', 'w') as f:
        json.dump(data, f, indent=4)

