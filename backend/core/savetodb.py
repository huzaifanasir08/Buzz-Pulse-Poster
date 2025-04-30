import mysql.connector
from . import mysqlconfig
from mysql.connector import Error

def connectdb():
        conn = mysql.connector.connect(
            host=mysqlconfig.host,    # Your host, e.g., "localhost"
        user=mysqlconfig.user, # Your MySQL username
        password=mysqlconfig.password, # Your MySQL password
        database=mysqlconfig.database  # Your database name
        )
        print("Connected to database.")

        return conn


def saveDataInDb(post_type, caption, scheduled_time, created_at, is_posted, instagram_account_id, hashtags, media_urls):
    try:
        conn = None
        if conn is None or not conn.is_connected():
            conn = connectdb()
        cursor = conn.cursor()
        for media_url, time in zip(media_urls, scheduled_time):
            try:
                sql = f"""INSERT INTO core_mediapost (post_type, caption, scheduled_time, created_at, is_posted, instagram_account_id, hashtags, media_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""

                # Data to insert
                values = (post_type, caption, time, created_at, is_posted, instagram_account_id, hashtags, media_url)

                # Execute the query
                cursor.execute(sql, values)

                # Commit changes
            except Exception as e:
                conn.commit()
                print(f"Error inserting data: {e}")
                
        print(f"{cursor.rowcount} record inserted.")

        if conn is not None and conn.is_connected():
            conn.commit()
            cursor.close()
            conn.close()
        return True
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return False
