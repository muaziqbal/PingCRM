from setuptools import setup, find_packages

setup(
    name="pingcrm",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.109.2",
        "uvicorn==0.27.1",
        "sqlalchemy==2.0.27",
        "psycopg2-binary==2.9.9",
        "pydantic==2.6.1",
        "alembic==1.13.1",
        "python-dotenv==1.0.1",
        "python-multipart==0.0.9",
        "passlib==1.7.4",
        "python-jose==3.3.0",
        "pydantic-settings==2.1.0"
    ],
)