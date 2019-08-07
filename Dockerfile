FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM python
WORKDIR /app
COPY --from=builder /app/leadmanager/. /app
RUN pip install -r requirements.txt && python manage.py migrate
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
