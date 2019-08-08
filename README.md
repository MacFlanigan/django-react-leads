# django-react-leads

Project using django rest framework, and react.

- User registration and login using knox (token auth)
- secured CRUD API with a simple table (leads)

### Launch using docker:

```shell script
docker-compose up
```

navigate to http://localhost:8000

### Launch using python and node

from the root directory:

1. pip install -r ./leadmanager/requirements.txt
2. npm install
3. npm run build
4. python ./leadmanager/manage.py migrate (at install, not required after)
5. python ./leadmanager/manage.py runserver
6. navigate to http://localhost:8000
