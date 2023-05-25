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
    except SQLAlchemyError as error:
        print("Connection error:", error)
        return None
    return conn

def fetch_data():
    conn = connect()
    if conn is None:
        return

    try:
        # Create a session
        Session = sessionmaker(bind=conn)
        session = Session()

        # Define the query
        query = text("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public'")
        
        # Log the query
        print("Executing query:", query)

        # Execute the query
        result = session.execute(query)

        # Fetch all rows from the result
        rows = result.fetchall()

        # Print the fetched table names
        for row in rows:
            print(row[0])

    except SQLAlchemyError as error:
        print("Query execution error:", error)

    finally:
        # Close the session and connection
        session.close()
        conn.close()

# Call the fetch_data() function to retrieve table names from the database
fetch_data()
