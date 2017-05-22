# Virtual Grade for Angular

This is a single-page application meant to consolidate every aspect of course grading and administration. 

#### Overview

VirtualGrade is a complete rewrite of @tofergregg's virtualgrade, which was itself based on UVA's TPEGS open-source grading solution.

The point of the application is to create a consolidated system for submitting, grading/annotating, and returning assignments all online.

The current version has three modes: student view, grader view, and admin (archon) view, each with a different purpose.

#### Project Status

This project is very much under development at the present time. This application was originally written for AngularJS and
has since been ported to Angular 4.1 (as of 4/19/2017).

Functional elements of the project so far:
* Interactive PDF/SVG editing modal which allows for annotations using lines and text
* Initial templating to view scores (student view) and create assignments (admin view)
* Layout pending design review for navigation
* Connection to backend server API (see below)
* Builds successfully with Angular AOT


#### The Backend

This repository contains code exclusively for the frontend of VirtualGrade. This was done for several reasons.
Namely, to allow users the freedom to develop multiple backend systems for the frontend implementation, so long as a
base API is followed. The other reason is to allow the same for the frontend (perhaps with a new version written in React).
The initial version of this backend is most likely going to be written in Python (either with Django or Flask).

#### Realtime Interaction

One of the main components of this system is its ability to utilize realtime technologies in the form of DerbyJS's ShareDB
realtime server. The requisite module to use with this system will necessitate a NodeJS server instance, which will also
be freely available. The realtime system would ideally be made available in multiple languages in the future (with support
for multiple database types), but until then we are stuck with Node.


#### Future Development and Roadmap

* Finalize basic design for each view and at each level
  * Grades view: separate view for past/current courses, grades "portal" for aggregate view
  * Grading view: finalize top-level view and item view, grading "portal" for solutions/discussion
  * Admin view: finalize top-level view and item view, finalize creation workflow and create backend API
  * Account view: create new view to allow for customization of account settings (maybe hiding courses as needed)
  * Maybe add Help page
* Integrate realtime component into the grading view
* Finalize the API for the backend/realtime to allow for more robust backend development
* 
