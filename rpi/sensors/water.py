# GPIO and packages
import RPi.GPIO as GPIO
import time
import datetime
import mysql.connector
 
# Initialize GPIO
channel = 21
GPIO.setmode(GPIO.BCM)
GPIO.setup(channel, GPIO.IN)

# Functions for data load
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

def callback(channel):
        if GPIO.input(channel):
                mycursor = mydb.cursor()

                # Format Date/Time Output
                currentDT = datetime.datetime.now()
                timeNow = currentDT.strftime("%Y-%m-%d %H:%M:%S")

                # Alert output when water is detected (i.e. true)
                print("Last valid detection: " + str(timeNow))
                print("ALERT! Water detected.")

                # Insert record into MySQL
                do_insert(mycursor, ("Water", "1", "1")
                mydb.commit()
                print(mycursor.rowcount, "Record inserted successfully!")
                
        # if GPIO.input(channel):
        #         print "Water Detected!"
        # else:
        #         print "Water Detected!"
 
GPIO.add_event_detect(channel, GPIO.BOTH, bouncetime=300)  # Notifiy when the pin goes HIGH or LOW
GPIO.add_event_callback(channel, callback)  # assign function to GPIO PIN, Run function on change
 
# infinite loop
while True:
        time.sleep(2)