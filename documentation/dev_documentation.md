# Developing in KanScratch:
- The backend and frontend stacks of the project are separated into a directory with the corresponding name in the root of the project. There is also another repository inside of this repository called `scratch-gui` which holds all the code for the scratch-gui (check `scratch-gui.md` for more details).

# Backend
- The backend of KanScratch is basically just an API that is structured with Django (https://www.djangoproject.com/) and Django ninja (https://django-ninja.rest-framework.com/).
- The API is a RESTful FastAPI.

# Frontend
- The API on the backend is called on the frontend using the JavaScript library "React" (https://reactjs.org/) on the frontend through axios (https://axios-http.com/docs/intro) calls.

# Database
- This project uses PostgreSQL.
- To view the tables and data in the database download a PostgreSQL client
    + We use DBeaver (use `sudo snap install dbeaver-ce` found in https://dbeaver.io/download/ to download DBeaver for Linux with "snap")
- To create dummy data, you need to seed the database. We do this with a fixture (https://docs.djangoproject.com/en/4.2/topics/db/fixtures/). Our fixtures are in "backend/projects/fixtures/". Follow the documentation above to write one or look at our example `initial.json`, but it's basically a .json file that Django can use to create objects in the database following the fields specified in the `models.py`.
  + To run a fixture and seed the database (effectively replacing the current data):
  ```
  docker-compose run --rm web python3 manage.py loaddata {name of the fixture. Ex: initial.json}
  ```

# Docker
- This project is packaged into docker containers. One for the PostgreSQL database (`db`), one for the backend Django site (`web`), and one for the frontend (`frontend`).
- Developer environment vs. production environment:
    + The developer environment is run with `docker-compose up`, and uses the `docker-compose.yaml` file when building
    + The production environment is run with ``

# Deployment
- The backend is deployed with Gunicorn and Nginx, and the frontend is deployed with Nginx.
    + Look in `nginx` directory and `docker-compose.prod.yaml` for deployment code and information.

# Testing
- We use Django's UnitTest 
- Frontend testing should be done with Jest (https://jestjs.io/). We couldn't get this working in time as we struggled a lot to get tests for api calls (which is a huge majority of the site), but Jest's snapshot tests would really improve the coverage of KanScratch (https://jestjs.io/docs/snapshot-testing). Jest tests can be run (after directing to the frontend container with `cd frontend` in your terminal) with `npm run test`.
- Backend testing done with `django.tests` in `backend/backend/tests/`
  + `model_bakery` is used to make it easier to create objects (without model_bakery you have to specific every field value that doesn't have a default, but with model_bakery you just create a recipe, and model_bakery creates all the fields you don't specify in your tests for you) by using recipes in `baker_recipes.py`. For more information: https://model-bakery.readthedocs.io/en/latest/
  + Backend tests can be run with:
    ```
    docker-compose exec -it web python3 manage.py test backend.tests.{testing file name Ex: test_api}.{function name}.{name of the test}
    ```
  + For more help run: 
    ```
    docker-compose exec -it web python3 manage.py test --help
    ```

# Useful files
- The navigation bar can be found in `frontend/src/components/topbar.js`.
- "index.js" (`frontend/src/index.js`) contains all of the routers with links across the site.
- "manage.py" (`backend/manage.py`) can be used to `makemigrations` and `migrate` to the database in the terminal (after directing to the backend directory with `cd backend`) with `docker-compose run web manage.py makemigrations` OR `docker-compose run web manage.py migrate`.
    + Migrations would need to be made after making changes to the `models.py`, or if you want to change the structure or properties of anything in the database.

# Potentially Confusing things about KanScratch
- What is the difference between Projects and ProjectSubmissions?
  + Projects are really just for teachers. It's the actual shell of the project with instructions, a due date, a date to make the project available, etc.
  + ProjectSubmissions are the student's version of the project. This is the actual object that they will edit and "turn in".
- What is the "Help" menu?
  + This is the user documentation meant to guide the user in using KanScratch. To be honest, it isn't very great or user friendly. It could be useful to look into Scratch's user documentation.
- Is this project using Django REST Framework?
  + No...well almost no. There is only one instance where we "use it" to show all the users when directing to "localhost:8000". It is attached with this path in the `urls.py`:
  ```
  path('', views.users_list, name='index')
  ```
  + This was done simply for versatilty in case a Django REST Framework view would be easier for something, or simply to allow for an easier transition to Django REST Framework if Django Ninja wasn't preferrable.
- Where can I find useful diagrams for this project?
  + The database diagram, UI mockups, container diagram, context diagram, and some useful design information can be found in the specification document located here: `documentation/SpecificationDocument.docx`

# Known Bugs:
- Project descriptions seem to all be the same for some reason.
  + To replicate login to a student account (student1 has two projects if using `initial.json` fixture), go to main page, click into each project details and notice that both of the descriptions are the same despite there being different descriptions in the `initial.json` fixture objects.
