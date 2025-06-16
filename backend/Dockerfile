FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    python3-dev \
    libssl-dev \
    libffi-dev \
    libmariadb-dev \
    && apt-get clean

WORKDIR /usr/src/app

COPY req.txt .
RUN pip install --upgrade pip && pip install -r req.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "BuzzPulsePoster.wsgi:application", "--bind", "0.0.0.0:8000"]