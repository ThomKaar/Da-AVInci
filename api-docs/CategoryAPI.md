
# Category API

**Get Category**
----
  Returns list of all categories and their items.

* **URL**

  /category/all

* **Method:**

  `GET`
  
*  **URL Params**

   `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{name:"", items:[]}, ...]`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "Log in" }`

* **Sample Call:**


* **Notes:**
  
---

**Delete Category**
----
  Deletes acategory

* **URL**

  /category/:name

* **Method:**

  `DELETE`
  
*  **URL Params**

   `name:""`

* **Data Params**

  `{ name:"", items:[]}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `idk`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "idk" }`

* **Sample Call:**


* **Notes:**

---

**Update Category**
----
  Updates a category and it's items

* **URL**

  /category/

* **Method:**

  `PUT`
  
*  **URL Params**

  `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{}, ...]`
 
* **Error Response:**

  * **Code:** 404 ERROR <br />
    **Content:** `{ error : "Log in" }`

* **Sample Call:**


* **Notes:**