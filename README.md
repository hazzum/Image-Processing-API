# Image-Processing-API
Image processing API project for Udacity's advanced web track

# Testing Endpoints
There's only one endpoint `/api/view` whose route takes the following form:

* **URL**

  <_/api/view?filename=[file_name_excluding_extension]&height=[height_in_pixel_(optional)]&width=[width_in_pixel_(optional)]_>

* **Method:**
  
  `GET`
  
* **URL Params**

   **Required:**

   `filename=[alphanumeric]`

   **Optional:**

   `width=[number]` default value `=200`
   `height=[number]` default value `=200`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "The image you're looking for does not exist on the server" }`

