
# Image API

**Get All Images**
----

  Returns list of all images

* **URL**

  /image/all

* **Method:**

  `GET`
  
*  **URL Params**

  `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{}, ...]`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "" }`

* **Sample Call:**


* **Notes:**
  
---

**Get all default images**
----

  Returns list of images in default category

* **URL**

  /image/default

* **Method:**

  `GET`
  
*  **URL Params**

   ``

* **Data Params**

  ``

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"Responses": {"Image": [{},...]}, "UnprocessedKeys" : {}}`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "idk" }`

* **Sample Call:**


* **Notes:**
  
---

**Get Images by Id**
----

  Returns list of images from given ids

* **URL**

  /image/collection/:ids

* **Method:**

  `GET`
  
*  **URL Params**

   `ids=[]`

* **Data Params**

  ``

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{},...]`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "idk" }`

* **Sample Call:**


* **Notes:**
---

**Upload New Image**
----

  Posts a new image file to the db

* **URL**

  /image/upload

* **Method:**

  `POST`
  
*  **URL Params**

   ``

* **Data Params**

  `{}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{},...]`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "idk" }`

* **Sample Call:**


* **Notes:**
