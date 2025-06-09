### In order to fill test data.
Instructions:
1. Go to src/main/resources/application.properties
2. Change 'spring.jpa.hibernate.ddl-auto=update' line into 'spring.jpa.hibernate.ddl-auto=create-drop'
3. Run Spring application ("mvn spring-boot:run") and stop(CTRL + C to terminal) after it fully runs
4. Copy,paste and run all of the queries in testData.txt to MySQL Workbench 
5. Change 'spring.jpa.hibernate.ddl-auto=create-drop' line back into 'spring.jpa.hibernate.ddl-auto=update'
6. Run spring application and stop after it fully runs 

### For running application
1. Start MySQL Server via MySQL Workbench.Make sure it has 'root' as user '1234' as password and set default scheme 'foodorderingsystemdb'
2. Cd into FoodOrderingSystem directory and execute 'mvn spring-boot:run'
3. Open another terminal window and cd into FoodOrderingSystem/frontend directory and execute 'npm run dev'
4. Open your browser and go to 'localhost:5173' address
