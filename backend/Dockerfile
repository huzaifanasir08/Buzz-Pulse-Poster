# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install build dependencies needed for mysqlclient and others
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy requirements first
COPY req.txt .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r req.txt

# Copy the rest of the code
COPY . .

# Expose Django port
EXPOSE 8000

# Run the Django server
CMD ["python", "manage.py", "runserver"]
