  from mysql import connector
    character = u'\u6e2c\u8a66'

    conn = connector.connect(
        user='lt5hfsavd9vkpnzm', password='p08mt4ynpo46g1vy', host='gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', database='xgac8qksj3ijdpb4')

    cursor = conn.cursor()

    sql = u"create table %s (id integer)" % character

    for i in range(2):
        try:
            cursor.execute(sql)
        except connector.ProgrammingError as exc:
            print(exc)
            break