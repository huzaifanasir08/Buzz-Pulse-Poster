FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# System deps
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Install Python deps
COPY req.txt .
RUN pip install --upgrade pip && pip install -r req.txt

# Copy project files
COPY . .

ENV DJANGO_SETTINGS_MODULE=BuzzPulsePoster.settings
RUN python manage.py collectstatic --noinput

# Expose port for Django dev server
EXPOSE 8000

# Default command is overridden by docker-compose
CMD ["gunicorn", "BuzzPulsePoster.wsgi:application", "--bind", "0.0.0.0:8000"]

