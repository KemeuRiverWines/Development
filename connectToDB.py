from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text

def connect():
    print("Connecting to remote IP")
    alchemyEngine = create_engine('postgresql+psycopg2://postgres:postgres@74.235.0.187/kumeudb')
    try:
        # connect to the PostgreSQL server
        conn = alchemyEngine.connect()
        print("Connection successful")
        return conn
    except SQLAlchemyError as error:
        print("Connection error:", error)
        return None

# Assuming you have a 'users' table in your database

def fetch_data():
    conn = connect()
    if conn is None:
        return

    try:
        # Create a session
        Session = sessionmaker(bind=conn)
        session = Session()

        # Execute the query
        query = text("SELECT * FROM sensor")
        result = session.execute(query)

        # Fetch all rows from the result
        rows = result.fetchall()

        # Print the fetched data
        for row in rows:
            print(row)

    except SQLAlchemyError as error:
        print("Query execution error:", error)

    finally:
        # Close the session and connection
        session.close()
        conn.close()

# Call the fetch_data() function to retrieve data from the 'users' table
fetch_data()