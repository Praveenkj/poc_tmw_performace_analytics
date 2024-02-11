### Webpage analytics

###### JS script to Analyze HTML Size, Script load time, image size in each page


- Change accepted threshold limit in ```env.js```
- Run ```npm install```
- Run ```npm start``` which exposes ```/analyze``` endpoint.
- ```html_pages_formatted``` folder contains the html.
- ```http://localhost:3001/analyze?fileName=home_page.html``` is the api endpoint. Change ```fileName``` path parameter accordingly in the folder. 