# About
This is an Expense Tracker MERN application which helps users keep track of their spending on different expenses. It uses React for frontend and NodeJS and Express for backend. Data is stored in MongoDB. The application is also built using four independent microservices. You can read more about microservice architecture style here:
https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices


## 1. Main features
The application allows the user to create an account and log in.

After log in the user can create or add an expense by filling out a form.

The user can edit an expense or delete it. 

There is also a Help feature on the Navigation Menu which users can refer to to get detailed instructions on how to use the application effectively. It also provides them with an email address and phone number to call if they run into issues with the app.

The application also allows the user to log out.

```

```

## 2. Microservices

Microservice A was provided by my Teammate, Hana. It provides a way to convert the expenses from USD to other currencies (MXN pesos at the moment) but could be expanded to other currencies in the future.

Microservice B allows the user to check the weather for a specific valid US zip code in case they want to venture out and go shopping.
It uses the FreeCurrency API <a href="https://freecurrencyapi.com/">FreeCurrency API</a> to fetch the local weather for a valid zip code.

Microservice C allows the user to visualize a Bar/Line Chart of their monthly expenses so that they can visually see how they spend their money on groceries, entertainment, or other categories.

Microservice D allows the user to view their user profile settings and preferences (name, email, gender, location, zipcode, occupation). In the future this information can be used to generate personalized recommendations for the user.

```

```

## 3. UML Diagram 

<img width="860" height="554" alt="image" src="" />


