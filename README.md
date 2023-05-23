# Image-Compression

<p>Projeto desenvolvido em node.Js utilizando o nestJs como framework,
o projeto possui somente uma rota que recebe como parametros uma url e um fator de compressao e com isso e feito o download da imagem e caso necessario sera feito o redimensionamento da imagem, sera salvo uma copia da imagem e dos metadados contidos na mesma e depois sera retornado o local onde foram salvo as imagens e os metadados na resposta da requisicao.<p>

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
