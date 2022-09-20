# Test technique GMG Santé:

1/ Développer en PHP Laravel une mini API REST avec output en json

Cette api doit:

=> Gérer 2 types d'objets :
- User (id, name, first_name, email, created_at, updated_at)
- Task (id, name, description, status , user_id , created_at, updated_at)

=>  Mettre à disposition les endpoints permettant de récupérer les données d'un User et d'une Task. (ex: /users/$id). Un export de ton Postman sera le bienvenu ! 

=>  L'api doit être capable de manipuler la liste des taches associées à un utilisateur en offrant la possibilité de :
- Récupérer cette liste de taches
- Créer, modifier et supprimer une ou n tache(s) associées à un user    

Mais également :
- ajouter/supprimer/modifier un utilisateur

En développant cette API, tu dois garder en tête qu'elle est susceptible d'évoluer (nouveaux retours, nouveaux attributs dans les objets)

2/ Développer un front (avec ou sans framework) en HTML/JS/CSS (pas de design nécessaire, mais si c'est user friendly, ce sera toujours un point supplémentaire !)

Ce front doit communiquer avec l'api en ajax.

On doit pouvoir y gérer :
- les utilisateurs (CRUD)
- la liste des tâches associées à un utilisateur (CRUD)

Au même titre que l’API, le front est susceptible d'évoluer (nouvelles vues, fonctionnalités etc …)


# GmgFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

# Install

`npm install`

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
