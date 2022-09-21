# Image-Processing-API
Image processing API project for Udacity's advanced web track

# Application URL
`http://localhost:5000`

* **Working scripts:**
    `npm run build` <br />
    `npm run dev` <br />
    `npm run start` <br />
    `npm run format` <br />
    `npm run lint` <br />
    `npm run test` <br />

# Testing Endpoints
There are two endpoints: `/api/view` for resizing an image & `/api/greyscale` for resizing and serving a greyscale version of the image

# `/api/view` Endpoint

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

  * **Code:** 500 <br />
    **Content:** `{ error : "Error 500: could not process image" }`  

  * **Code:** 500 <br />
    **Content:** `{ error : "Error 500: could not save thumbnail" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Error 500: internal server error" }`


# `/api/greyscale` Endpoint

* **URL**

  `/api/greyscale?filename=<image_name>&height=<height>&width=<width>`

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

  * **Code:** 500 <br />
    **Content:** `{ error : "Error 500: could not process image" }`  

  * **Code:** 500 <br />
    **Content:** `{ error : "Error 500: could not save the greyscale image" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Error 500: internal server error" }`