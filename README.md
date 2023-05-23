# Image-Compression

<p>
Projeto desenvolvido em node.Js utilizando o nestJs como framework,
o projeto possui somente uma rota que recebe como parâmetros uma url é um fator de compressão e com isso e feito o download da imagem e caso necessário será feito o redimensionamento da imagem, será salvo uma cópia da imagem e dos metadados contidos na mesma e depois será retornado o local onde foram salvo as imagens e os metadados na resposta da requisição.
<p>

### Requisitos

- Node v18.15.0
- npm
- Docker
- .env com os valores definidos

## Execucao

### 1. Entre no diretorio do projeto

~~~
cd image-compression
~~~

### 2. Docker-compose

~~~
docker-compose up -d
~~~

### 3. Instale dependencias e execute o projeto

~~~
npm install
npm run start:dev
~~~
