
# Item API

**Get Item by ID**
----
  Return Item with Id

* **URL**

  /item/:id

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
    **Content:** `{ error : "Log in" }`

* **Sample Call:**


* **Notes:**


---

**Get Item Title**
----
  Gets item's titles

* **URL**

  /item/top/title

* **Method:**

  `GET`
  
*  **URL Params**

   ``

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
  

---

**Get Item by Content**
----
  Gets Item by Content

* **URL**

  /item/art/:content

* **Method:**

  `GET`
  
*  **URL Params**

   ``

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
  
---

**Get New Item id**
----
  Get Id of last inserted item

* **URL**

  /item/newId/newId

* **Method:**

  `GET`
  
*  **URL Params**

   ``

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
  
---

**Get Item by Content & label**
----
  Get Item by content * label

* **URL**

  /item/art/:content/:label

* **Method:**

  `GET`
  
*  **URL Params**

   ``

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
  
---


**Create new Item**
----
  Create new item and insert into db

* **URL**

  /item/create

* **Method:**

  `POST`
  
*  **URL Params**

   ``

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
  
---


**Update Item**
----
  Update item with given id

* **URL**

  /item/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   ``

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
  
---


**Delete Item**
----
  Delete item with given id

* **URL**

  /item/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   ``

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
  
---