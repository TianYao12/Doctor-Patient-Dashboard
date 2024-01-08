# Medical Dashboard
This is an web application separated into two difference user types: patients and doctors. 
Users are authenticated using **cookies**, **JWT**, **Bcrypt**, and **PostgresSQL**

Doctors can see all the patients and see the disease that the patient is diagnosed with and prescribe a medication to send back.

Patients can select the symptoms they are feeling and submit the info to a deployed machine learning model.

It is a simple **logistic regression** model trained from a Kaggle dataset (https://www.kaggle.com/datasets/kaushil268/disease-prediction-using-machine-learning) using sklearn. 
On the small testing dataset, it achieves **100% **accuracy. 
The model is deployed using **FastAPI**, **Docker**, and **Heroku**.

The frontend of the web application is done in **React**, with an **Express.js** backend, and **PostgresSQL**.
