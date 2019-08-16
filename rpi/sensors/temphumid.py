# Packages/Libraries
import RPi.GPIO as GPIO
import dht11
import time
import datetime
import urllib
import mysql.connector

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
# url = "mysql://lt5hfsavd9vkpnzm:p08mt4ynpo46g1vy@gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3$

# initialize GPIO
GPIO.setwarnings(True)
GPIO.setmode(GPIO.BCM)

# Read data using pin 17
instance = dht11.DHT11(pin=17)

try:
    while True:
        result = instance.read()
        if result.is_valid():
            mycursor = mydb.cursor()

            # Format Date/Time output
            currentDT = datetime.datetime.now()
            timeNow = currentDT.strftime("%Y-%m-%d %H:%M:%S")

            # Decalre variables:
            fah = ((result.temperature * 9/5)+32)
            hum = result.humidity

            #f = urllib.urlopen(load_me)
            #myfile = f.read()

            # Output:
            print("Last valid input: " + str(timeNow))
            print("Temperature: %d F" % fah)
            print("Humidity: %-3.1f %%" % hum)

            # Insert output into MySQL
            do_insert(mycursor, ("temperature", str(fah), str(timeNow), "1"))
            do_insert(mycursor, ("humidity", str(hum), str(timeNow), "1"))

            mydb.commit()
            print(mycursor.rowcount, "YAY! Record inserted successfully.")

        time.sleep(3)

except KeyboardInterrupt:
    print("Cleanup")
    GPIO.cleanup()
