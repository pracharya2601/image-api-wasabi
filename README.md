
# Image api using [Wasabi Cloud](https://wasabi.com/) Storage

Wasabi is the cloud object storage with affordable price. 
This is the express application with api for uploading and deliting the object.
This application is on initial development phase.


## NPM Package Uses

 - [aws-sdk](https://www.npmjs.com/package/aws-sdk)
 - [busboy](https://www.npmjs.com/package/busboy)
 - [express](https://www.npmjs.com/package/express)
 and other utils library like crypto, uuid and so on.

## To use this code for deployment

Clone the repo

```bash
  git clone git@github.com:pracharya2601/image-api-wasabi.git
```
Create .env file and copy paste the example form .env.example

Run project
```bash
  cd image-api-washbi
```
```bash
  yarn install || npm install
```
```bash
  yarn run dev || npm run dev
```


## API Reference (Development phase)

#### Post Object

```http
  POST /api/v1/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get Object

```http
  GET /api/v1/${objectKey}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `objectKey`      | `string` | **Required**. Nmae of the Object to fetch |
| `api_key`      | `string` | **Required**. Your API key|
