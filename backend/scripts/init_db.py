import os
import sys
from alembic.config import Config
from alembic import command

# Get the absolute path to the backend directory
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

# Now import the app modules
from app.db.session import SessionLocal
from app.db.init_data import init_data

def init_database():
    # Get the path to alembic.ini
    alembic_ini_path = os.path.join(backend_dir, "alembic.ini")

    # Create Alembic configuration
    alembic_cfg = Config(alembic_ini_path)

    try:
        # Run migrations
        print("Running database migrations...")
        command.upgrade(alembic_cfg, "head")

        # Initialize sample data
        print("Initializing sample data...")
        db = SessionLocal()
        try:
            init_data(db)
            print("Database initialization completed successfully!")
        except Exception as e:
            print(f"Error initializing data: {e}")
        finally:
            db.close()

    except Exception as e:
        print(f"Error during database initialization: {e}")
        sys.exit(1)

if __name__ == "__main__":
    init_database()