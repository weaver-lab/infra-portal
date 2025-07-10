FROM python:3.13-slim

COPY requirements.txt ./

RUN pip install --upgrade pip \
    && pip install -r requirements.txt;

COPY . .

EXPOSE 8000

WORKDIR /src

# Uncomment this uvicorn command and comment out the gunicorn command to run the backend in a test environment
# CMD ["python3.13", "-m", "uvicorn", "ida_store_api:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
CMD ["python3.13", "-m", "gunicorn", "ida_store_api:app", "-b", "0.0.0.0:8000", "-w", "4", "-k", "uvicorn_worker.UvicornH11Worker"]
