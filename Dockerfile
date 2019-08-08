FROM node:alpine as builder
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM python
RUN useradd -ms /bin/bash user
COPY --from=builder /app/ /home/user/app/
WORKDIR /home/user/app/leadmanager
RUN pip install -r requirements.txt
USER user
