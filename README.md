# file-based-webapp
Simple file-based database processing application

### Prerequisites
1. Make sure you have ```pip``` and Node JS (preferably V.16.14.2) 
2. ```pip install Flask```
3. ```pip install flask-marshmallow```
4. ```pip install Flask-Cors```
5. ```npm install bootstrap```
6. Navigate to the ```ui``` directory and run ```npm install``` in the terminal

### To start the project (assuming docker is already installed on the local machine)
1. ```docker pull postgres```
2. ```docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres```
3. ```docker ps``` to verify that the container is up and running
4. You can optionally access the container by running ```docker ps``` to retrieve the id and then ```docker exec -it <container-id> bash``` to access
the container's shell. From there, you can access postgres by running ```psql -U postgres```
6. Run ```app.py``` (start backend)
7. From the terminal:
  - ```cd ui```
  - ```npm start``` (start frontend)
8. Navigate to ```locahost:3000```

## Project summary and usage
This is a simple web application written in Flask and ReactJS with a sole purpose of displaying a database of students. PostgreSQL is used to retrieve student information

### Landing Page 
The landing page should look something like this (the student IDs will vary because they are auto generated attributes) 

<img width="1440" alt="Screen Shot 2022-12-18 at 2 12 51 AM" src="https://user-images.githubusercontent.com/70917323/208286092-504b9ab1-211a-4c14-a7b7-5b88d7d42369.png">


Possible operations are:
1. Add new students
2. Delete students 
3. Update student attributes
4. Query students

### Format of student attributes

1. The student ID is an auto generated unique attribute
2. First name cannot include digits and cannot be empty
3. Last name cannot include digits and cannot be empty
4. SSN must contain 9 digits and include dashes in the correct positions (e.g. 000-00-0000). It can be empty in case the student is international (and don't have one)
5. Major cannot contain digits and cannot be empty
6. Date cannot be empty
7. GPA can be empty if it is the student's first semester

In case you input an attribute in the wrong format, you will see an alert below the table. Also, if you forget any of the afforementioned rules, you can only use the help buttons provided in the UI.

**Example**

![image](https://user-images.githubusercontent.com/70917323/193510343-767b733d-69ba-47e2-bff7-5c18d4bde2c1.png)



### What to expect
- Adding a student will immediately populate the UI

![image](https://user-images.githubusercontent.com/70917323/193510601-a372502a-2840-4440-95d3-ca81d213c7d6.png)

- In case you violate any of the rules (like adding a student with a SSN that already exists in the DB) an alerting banner below the table will notify you of your mistake

![image](https://user-images.githubusercontent.com/70917323/193510932-654ff482-8212-4d3a-b603-178f339c6060.png)

- If you want to update a student, click on the **Update** button next to the student's name. The following row will appear. Make any changes you wish but always keep in mind the rules! Use the **Cancel** button to make the update prompt disappear

![image](https://user-images.githubusercontent.com/70917323/193511590-bb149aac-9b51-44a8-bd99-721e3b365dc9.png)

- To delete a student, click on the **Delete** button next to the student's name. The row will immediately disappear

- Use the **Search By ID** option to find the student with the specific ID

![image](https://user-images.githubusercontent.com/70917323/193511950-fdbf8ea6-e5c6-4711-ba7f-ec73dd3e6a94.png)


- Use the **Search By Date Of Birth (Range)** to search for student based on their date of births. If you populate both **From** and **To** fields, you will get all the students with date of births between these two values (the result will be inclusive). Notice how in the example below, the student with id ```aafcae45``` is not return as their date of birth is outside of the interval specified.

![image](https://user-images.githubusercontent.com/70917323/193514733-6aa44c0f-c0ae-40bb-9bd3-878f44fb1ac6.png)

- If you only populate the **From** option, you will get all the students with a date of birth after that date (this options is also inclusive, which means that if ```	1998-07-09``` is used, the student with id ```e386c083``` will also be returned). Similarly, if you use only the **To** options, you will get all the students with a date of birth up to that date (including that date). If neither of the two options are filled, you will get all the students in the database. The option directly below serves the same purpose, but eliminates the day option as you can only specify a month and a date. 

- Lastly, one can use the **Search By GPA** to query students based on their GPAs. If you include a value for both the **Lower Bound** and the **Upper Bound**, you will get all the students with a GPA in that interval (the search is also inclusive, which means that students with GPAs equal to the lower and upper bounds will also be returned). If you only specify a **Lower Bound**, you will get all the students will a GPA larger or equal to that and if you only specify an **Upper Bound** you will get all the students with a GPA smaller or equal to that. Specifying neither a lower or an upper bound will return all the students

![image](https://user-images.githubusercontent.com/70917323/193516556-b9a76942-d998-4c70-b598-4f7bc009ffd6.png)






