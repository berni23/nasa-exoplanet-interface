<h1 style = "text-align:center"> Exoplanets data interface <img src = "assets/nasa_rocket.jpg" style="width:50px"> </h1> 

*An interface for the visualization of data using the NASA api*

<p><i><b> Author:</b><i> Bernat Ferrer</i></p>



![Alt Text](assets/interface.gif)





<h3>Description</h3>

This project provides the user with an interface for a better interaction and visualization of scientific data . He or she can  interact with the plots and change  its settings accordingly . There is also a section for checking which is the astronomy picture of the day and an explanation from a professional astronomer.   



<hr>



<h3>Folder structure</h3>

 This project contains: 



* index.html : Log in and register

* app.html: Data interface, accessed once the user is logged in.

* phpunit.xml: Configuration for the test classes stored in the tests folder

* composer.json/composer.lock: list of packages used in PHP

* package.json/package-lock.json: list of packages used in javascript

  

* **assets folder** :Project assets like logos, fonts or  json objects for rendering graphics

<br>
  

* **css folder**:  style sheets.

   	- styles.css :  Style sheet for the index document.
    - app.css:  Style sheet for the app document.


<br>


* **tests folder / unit folder**: Folder containing the test documents  .

  - csvTest:  test class for the csv tools .

  - projectStructureTest: test class for testing that the whole project structure remains the same.

  - usersTest: Test class for validating and checking the data from the users.

<br>


* **documentation folder**: folder containing the documentation.

  - documentation.pdf: documentation regarding the developing of the project
  
  - proposal.pdf: presentation of the initial proposal

  * **Postman folder** : folder containing some of  example api  of the requests performed.

    

- **server folder**:

  * api_requests.php: handles queries related with  fetching to the NASA api.
  
  * csvTools.php: Set of functions for a better handling of csv files.
  
  * sign.php: Handles the sign in , sign out and registering.
   
  * utils.php: Set of general functions used throughout the server.
   
  * viewmodel.php : Document recieving the queries from php that expect data in return.
  
  * **data folder** :  Folder containing the user folders.

  

* **src folder**

  * sign.js: Document handling the signing in or registering of the user. included in index.html

  * app.js: Document handling the user interaction in app.html, once the user is logged in

  * data.js: Document containing functions that fetch the server

  * customCharts.js: Document containing  a class that enables a better  custom configuration of  a given
  
    chart, created with the chartjs library.

  * validate.js: Set of functions used for validating  inputs.

    	

<hr>



<h3>NASA API</h3>











