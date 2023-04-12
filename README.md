# pdfLibrary
pdfLibrary is an API that provides basic CRUD operations on PDF documents, with features like text extraction and searching.

## Installation

1. Clone the project: `git clone https://github.com/aigeoo/pdfLibrary.git`
2. Run `cd pdfLibrary`
3. Create `.env` file from `.env.example` file and adjust database & port parameters
4. Install the dependencies: `npm install`
5. Build the application: `npm build`
6. Run `npm start` 
8. Browse the application on http://127.0.0.1:3000

------
## Installation using docker
- Make sure you have docker installed. To install docker [click here](https://docs.docker.com/get-docker/).

1. Clone the project: `git clone https://github.com/aigeoo/pdfLibrary.git`
2. Run `cd pdfLibrary`
3. Create `.env` file from `.env.example` file and adjust database & port parameters
4. Build the Docker image: `docker build -t <image-name> .`
5. Run the Docker container: `docker run -p 3000:3000 <image-name>`
6. Browse the application on http://127.0.0.1:3000

------
## Examples

- `/auth/register` : Register a new user:

```shell
curl -X POST \
-H "Content-Type: application/json" \
-d '{"username": "<USERNAME>", "password": "<PASSWORD>"}' \
http://localhost:3000/api/v1/auth/register 
```

- `/auth/login` : Get authorization token:

```shell
curl -X POST \
-H "Content-Type: application/json" \
-d '{"username": "<USERNAME>", "password": "<PASSWORD>"}' \
http://localhost:3000/api/v1/auth/login
```

- `/data/create` : Create a new data record by uploading a PDF file

```shell
curl -X POST \
-H "Content-Type: multipart/form-data" \
-H "Authorization: Basic <token>" \
-F "file=@test.pdf" \
http://localhost:3000/api/v1/data/create
```

- `/data/all` :  Retrieve all of the registered files in the database

```shell
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
http://localhost:3000/api/v1/data/all
```


- `/data/download/<id>` : Retrieve a stored PDF given the ID

```shell
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
http://localhost:3000/api/v1/data/download/<id>
```

- `/data/delete/` : Delete a PDF file and all its related data 

```shell
curl -X DELETE \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
http://localhost:3000/api/v1/data/delete/<id>
```

- `/search/sentences/<id>` : Return all the parsed sentences for a given PDF ID

```shell
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
http://localhost:3000/api/v1/data/search/sentences/<id>
```

- `/search/word/<word>` : Search for the existence of a certain keyword in all stored PDF's

```shell
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
http://localhost:3000/api/v1/data/search/word/<word>
```

- `/search/topwords/<id>` : Retrieve the top 5 occurring words in a PDF 

```shell
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
http://localhost:3000/api/v1/data/search/topwords/<id>
```

- `/search/wordcount` : Check the occurrence of a word in PDF 

```shell
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
-d '{"id": "<ID>", "keyword": "<KEYWORD>"}' \
http://localhost:3000/api/v1/data/search/wordcount
```

- `/search/image` : Check the occurrence of a word in PDF 

```shell
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: Basic <token>" \
-d '{"id": "<ID>", "page": "<PAGE_NUMBER>"}' \
http://localhost:3000/api/v1/data/search/image
```
