# Image-Processing-API
Image processing API project for Udacity's advanced web track

# Application URL
`http://localhost:5000`

# Working scripts:
    `npm run build`
    `npm run dev`
    `npm run start`
    `npm run format`
    `npm run lint`
    `npm run test`

# Testing Endpoints
There's only one endpoint `/api/view` whose route takes the following form:

* **URL**

  `/api/view?filename=<image_name>&height=<height>&width=<width>`

* **Method:**
  
  `GET`
  
* **URL Params**

   **Required:**

   `filename=[string]`

   **Optional:**

   `width=[number]` default value `=200` <br />
   `height=[number]` default value `=200`
   

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `<Buffer>`

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Error 404: image does not exist on the server" }`

  * **Code:** 400 <br />
    **Content:** `{ error : "Error 400: "width/height" with value [bad value] fails to match the required pattern: /^[0-9]+$/" }`  

  * **Code:** 400 <br />
    **Content:** `{ error : "Error 400: no filename was sent" }`
