#!/usr/bin/python
import RPi.GPIO as GPIO
import time
import datetime
import mysql.connector

# GPIO SETUP
channel = 21
GPIO.setmode(GPIO.BCM)
GPIO.setup(channel, GPIO.IN)

# Functions


def do_insert(cur, val):
    sql = "insert into Sensors (sensorType, sensorStatus, createdAt, UserId) VALUES (%s, %s, %s, %s)"
    cur.execute(sql, val)


# Heroku DB
mydb = mysql.connector.connect(
    host="gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user="lt5hfsavd9vkpnzm",
    passwd="p08mt4ynpo46g1vy",
    database="xgac8qksj3ijdpb4"
)
# url = "mysql://lt5hfsavd9vkpnzm:p08mt4ynpo46g1vy@gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1$


def callback(channel):
    mycursor = mydb.cursor()

    # Format Date/Time Output
    currentDT = datetime.datetime.now()
    timeNow = currentDT.strftime("%Y-%m-%d %H:%M:%S")

    # Output
    print("Last valid detection: " + str(timeNow))
    print("ALERT: Flame detected!")

    # Insert record into MySQL
    do_insert(mycursor, ("flame", "1", str(timeNow), "1"))
    mydb.commit()
    print(mycursor.rowcount, "YAY! Record inserted successfully.")


# let us know when the pin goes HIGH or LOW
GPIO.add_event_detect(channel, GPIO.BOTH, bouncetime=300)
# assign function to GPIO PIN, Run function on change
GPIO.add_event_callback(channel, callback)

# infinite loop
while True:
    time.sleep(5)
