FROM python:3.10

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .


# Command to run the application
ENTRYPOINT ["mcp", "run", "main.py"]
