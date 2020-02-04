# prerequisites
1. Npm

# Installation
1. git clone https://www.github.com/krupalhp2907/dashboard
2. npm install
3. Replace your firebase credentials 
4. npm start

## Architecture

[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

![Clean Arch.](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

## File Structure
1. Public -
      - index.js Main html file ( contains root element for rendering )
2. src -
      - index.js (main entry point for src)
      - withTracker (Higher order Component that  manages history, tracking and authentication)
      - routes.js 
          - contains routes for the single page application
          - Set protected true for protected routes
      - components ( contains components for rendering ) 
      - views ( contains pages for application or routes linked components )
      - Controller 
         - (here controller provides/ by passes the html req, res type format to firebase functionality via react context provider)
      - data - access
          - This layer handles server/ database communication
      - use-cases
            - All the business logic goes here
      - entity
            - core of application any changes made here would directly have an ripple of change to whole application
      - presenter (useless)
      - algorithm-test (empty folder for algorithm testing)
 
## Tasks

- [x] Test rfid input code
-  [] Use cases and React is tightly coupled solve this by destructing use cases and entity formation relation
-  [] Make Reports clean
-  [] Make a company entity
