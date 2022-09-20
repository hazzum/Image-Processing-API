# Image-Processing-API
Image processing API project for Udacity's advanced web track

# Testing Endpoints
There's only one endpoint `/api/view` whose route takes the following form:

* **URL**

  `/api/view?filename=<image_name>&height=<height>&width=<width>`

* **Method:**
  
  `GET`
  
* **URL Params**

   **Required:**

   `filename=[alphanumeric]`

   **Optional:**

   `width=[number]` default value `=200` <br />
   `height=[number]` default value `=200`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `<Buffer>`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Error 404: image does not exist on the server" }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Error 400: "width/height" with value [bad value] fails to match the required pattern: /^[0-9]+$/" }`  

