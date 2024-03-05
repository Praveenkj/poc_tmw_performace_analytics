### Webpage analytics

###### JS script to Analyze HTML Size, Script load time, image size in each page


- Change accepted threshold limit in ```env.js```
- Run ```npm install```
- Run ```npm start``` which exposes ```/analyze``` endpoint.
- ```html_pages_formatted``` folder contains the html.
- ```http://localhost:3001/analyze?fileName=home_page.html``` is the api endpoint. Change ```fileName``` path parameter accordingly in the folder. 

### Postman collection URL

###### get_by_url
http://localhost:3001/analyze?version=v1&url=https://www.menswearhouse.com/c/mens-clothing/mens-suits


###### get_by_file_name (preferred, download HTML & use this)
http://localhost:3001/analyze?version=v2&fileName=home_page.html


