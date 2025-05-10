import mysql.connector
from . import mysqlconfig
from mysql.connector import Error
from . import models

def connectdb():
        try:
            conn = mysql.connector.connect(
                host=mysqlconfig.host,    # Your host, e.g., "localhost"
            user=mysqlconfig.user, # Your MySQL username
            password=mysqlconfig.password, # Your MySQL password
            database=mysqlconfig.database  # Your database name
            )
            print("Connected to database.")

            return conn
        except:
            return None


def saveDataInDb(post_type, caption, scheduled_time, created_at, has_tried, instagram_account_id, hashtags, media_urls, has_posted, logs=None):
    try:
        conn = None
        if conn is None or not conn.is_connected():
            conn = connectdb()
        cursor = conn.cursor()
        for media_url, time in zip(media_urls, scheduled_time):
            print(media_url[0], media_url[1])
            try:
                sql = f"""INSERT INTO core_mediapost (post_type, caption, scheduled_time, created_at, has_tried, instagram_account_id, hashtags, media_url, has_posted, file_deleted, logs) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

                # Data to insert
                values = (media_url[0], caption, time, created_at, has_tried, instagram_account_id, hashtags, media_url[1], has_posted, False, logs)

                # Execute the query
                cursor.execute(sql, values)

                # Commit changes
            except Exception as e:
                conn.commit()
                print(f"Error inserting data: {e}")
                
        # print(f"{cursor.rowcount} record inserted.")

        if conn is not None and conn.is_connected():
            conn.commit()
            cursor.close()
            conn.close()
        return True
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return False




def get_data(id):
    try:
        conn = None
        if conn is None or not conn.is_connected():
            conn = connectdb()
            if conn is None:
                return []
            try:
                query = f'''SELECT
                    DATE(scheduled_time) AS post_date,
                    COUNT(*) AS total_posts,
                    SUM(CASE WHEN post_type = 'post' THEN 1 ELSE 0 END) AS post_count,
                    SUM(CASE WHEN post_type = 'reels' THEN 1 ELSE 0 END) AS reels_count,
                    SUM(CASE WHEN has_tried = 1 THEN 1 ELSE 0 END) AS tried_count,
                    SUM(CASE WHEN has_posted = 1 THEN 1 ELSE 0 END) AS posted_count,
                    SUM(CASE WHEN has_tried = 1 AND has_posted = 0 THEN 1 ELSE 0 END) AS failed_count,
                    SUM(CASE WHEN has_posted = 1 AND file_deleted = 1 THEN 1 ELSE 0 END) AS deleted_count
                FROM
                    core_mediapost
                WHERE
                    instagram_account_id = {id}
                GROUP BY
                    DATE(scheduled_time)
                ORDER BY
                    post_date;'''
                cursor = conn.cursor()
                cursor.execute(query)
                data = cursor.fetchall()
                try:
                    if conn is not None and conn.is_connected():
                        cursor.close()
                        conn.close()
                except:
                     pass
                               
                return data
            except:
                return []

        if conn is not None and conn.is_connected():
                cursor.close()
                conn.close()
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return []