# StarwayMonster

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running in a Docker container:

### Pure Docker

Build or rebuild container:
* `docker build -t starway-monster-web:v1 .`

Runs processes in isolated containers
* `docker run -it -d --rm -p 9000:80 starway-monster-web:v1`

After that, the application will be available: http://localhost:9000

### Via Docker-Compose

Build or rebuild services:
* `docker-compose build`

Builds, (re)creates, starts, and attaches to containers for a service:
* `docker-compose up -d`

After that, the application will be available: http://localhost:9000

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Danger zone!

Stops containers and removes containers, networks, volumes, and images
created by `up`.

* Not for production!

```diff
- docker-compose down -v
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
