# require mysql.connector library install
import mysql.connector
​
# Connect to Heroku DB
mydb = mysql.connector.connect(
    host="gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user="lt5hfsavd9vkpnzm",
    passwd="p08mt4ynpo46g1vy",
    database="xgac8qksj3ijdpb4"
)
​
# Insert function​
mycursor = mydb.cursor()
sql = "INSERT INTO Sensors (sensorType, sensorStatus) VALUES (%s, %s)"
val = ("temp", "89")
mycursor.execute(sql, val)
mydb.commit()
​
print(mycursor.rowcount, "Record inserted!")
