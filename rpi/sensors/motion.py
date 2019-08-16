# PIR (Passive Infrared Sensor) measures infrare (IR) light
# radiating from objects in its field of view.

# Uses the GPIO trigger callback to trigger the GPIO pin state change
# (from low to high). Run the sense_motion.py script and move your hand
# in front of the sensor to trigger the motion detection call back:

# Greeting when the sensor is activated:

#!/usr/bin/python
# Packages and Libraries
import RPi.GPIO as GPIO
import time
import datetime
import mysql.connector

# Initialize GPIO
GPIO.setmode(GPIO.BCM)
PIR_PIN = 14
CNT = 0
GPIO.setup(PIR_PIN, GPIO.IN)

# Functions to insert output into MySQL


def do_insert(cur, val):
    sql = "insert into Sensors (sensorType, sensorStatus, createdAt, UserId) VALUES (%s, %s, %s, %s)"
    cur.execute(sql, val)


# Heroku
mydb = mysql.connector.connect(
    host="gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user="lt5hfsavd9vkpnzm",
    passwd="p08mt4ynpo46g1vy",
    database="xgac8qksj3ijdpb4"
)
# Activiate the sensor:


def MOTION(PIR_PIN):
    mycursor = mydb.cursor()

    # Format Date/Time Output
    currentDT = datetime.datetime.now()
    timeNow = currentDT.strftime("%Y-%m-%d %H:%M:%S")

    # Alert output when motion is detected (i.e. true)
    print("Last valid detection: " + str(timeNow))
    print("BOO! Motion detected.")

    # Record output into MySQL
    do_insert(mycursor, ("motion", "1", str(timeNow), "1"))
    mydb.commit()
    print(mycursor.rowcount, "Record inserted successfully!")


time.sleep(10)

try:
    GPIO.add_event_detect(PIR_PIN, GPIO.RISING, callback=MOTION)
    while 1:
        time.sleep(100)
except KeyboardInterrupt:
    print("Quit")
    GPIO.cleanup()
