Welcome to the ngrxangularstore

The ngrx is intended to provide a simple code for user login and signup component with store and fake json server and json server auth as backend.

The stack is made up of: angular 10.0.3
node :  node v 10.16

Pre-requisites
<ul>
 <li>node.js - <a href="https://nodejs.org/en/download/" rel="nofollow">Download page</a> .</li>
 <li>npm - comes with node or download yarn - <a href="https://yarnpkg.com/lang/en/docs/install" rel="nofollow">Download page</a> .</li>
 <li>json server auth - <a href="https://www.npmjs.com/package/json-server-auth" rel="nofollow">Json server and Json server auth</a> .</li>
 <li>Angular (formerly Angular.js): Front-end web app framework; runs your JavaScript code in the user's browser, allowing your application UI to be dynamic</li>
</ul>

Installation
git clone https://github.com/benchmark-bits/AngularNGRX.git
cd  AngularNGRX
npm install
ng serve

To install Fake JSON Server
npm install -D json-server json-server-auth

To Start Fake JSON Server
npx json-server-auth db.json  (in another terminal to run fake json server)

