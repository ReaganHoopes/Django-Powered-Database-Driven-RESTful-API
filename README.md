# Django-Powered-Database-Driven-RESTful-API

What this project is:
- For this project I created a Django-powered API to provide data in the form of JSON as well as JSON data from 3rd-party APIs.
- The project uses an API from Nasdaq to retrieve the current value of gold in dollars per Troy oz 
- The project also uses a RESTful unit conversion API that I wrote as a Django app to convert between units of measure. The API responds to GET requests using 'from', 'to', and 'value' parameters
- Errors are handled and users are notified when connection to Nasdaq fails.
- User can input a value and select a unit from the drop down menu to get the the cost of the given weight's worth of gold.
- A new div will be converted for each calculation and divs can be removed by clicking on them.

How to use:
- First, from the command line navigate to the directory titled "worthyourweight"
- Run $ python manage.py runserver
- Go to your browser and type in http://localhost:8000/gold/
- You can then calculate conversions as explained above

Languages used:
- HTML
- CSS
