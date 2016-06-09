# Node.js, Express, PostgreSQL API template
### How to use
  this template assumes you are running postgres locally. If you dont have postgres installed yet, please do so before continuing. If you are running Macintosh, check out [Postgres.app](http://postgresapp.com/).

  If you would like to use a GUI to navigate your database, I suggest [Postico](https://eggerapps.at/postico/)

  As soon as you configure your local DB and can connect with your client of choice, create a database. Call it test, or another name.

  Additionally, node is required to be installed locally.

### getting started
  * Fork, clone, and enter your directory.
  * `npm install` to get all required node packages
  * `nodemon server.js` to run your server

### Database Configuration
  Open our /migrations directory to take a look at the default migration file:
  ```javascript
  exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTableIfNotExists('YOUR_TABLE_NAME_HERE', function(table){
        table.increments('id').primary()
        table.text("post_contents")
        table.text("created_at")
        table.text("updated_at")
      })
    ])
  }
  exports.down = function(knex, Promise) {
    knex.schema.dropTable('YOUR_TABLE_NAME_HERE')
  }
  ```
  First, we need to add a table name to our migration file. Now would be a great time to add a table name, as well as some columns to our database.

  Open our config/knexfile.js file and update our connection string to include your PG database:
  ```javascript
  // Update with your config settings.
  module.exports = {
      // development configuration for local PG
      development: {
          client: 'pg',
          connection: 'postgres://localhost/YOUR_DATABASE_HERE',
          migrations: {
              'directory': __dirname + "/migrations",
              tableName: "users"
          }
      }
  };
  ```
#### Knex, Bookshelf.js, ModelBase oh my!
  Lets take a look at our DB configuration file, database_config.js

  ```javascript
  var config = require('./knexfile.js');
  var env = 'development';
  // knex config
  var knex = require('knex')(config[env]);
  knex.migrate.latest([config]);
  // bookshelf config
  bookshelf = require('bookshelf')(knex);
  bookshelf.plugin('registry');
  module.exports = bookshelf;
  // bookshelf-modelbase
  var ModelBase = require('bookshelf-modelbase')(bookshelf);

  ```
  What the he!! is all this stuff? short answer, they are abstractions on top of SQL to get our querying done, and be able to use the JS object model we all know so well. Knex is the SQL connector for js, allowing us to change db tables and query in the classic SQL fashion. Bookshelf.js is for the object notation abstraction. Finally we use bookshelf-modelbase to access a bunch of pre build models for CRUD operations.

  JS object notation create query for example:

  ```javascript
  userTable.create({ name:'Stimpy Dangerfield', pw:'foobarbaz', occupation: 'Private Eye' })
  ```
  As apposed to classic SQL, who wants to do this any more?

  ![bobo](https://media.giphy.com/media/WrxoaVPiq0cG4/giphy.gif)
  ```sql
  INSERT INTO userTable (name, pw, occupation)
  VALUES('Stimpy Dangerfield', 'foobarbaz', 'Private Eye');
  ```


#### Knex Migration
  Next we must execute our migration using the knex CLI. First, install the knex CLI globally if you dont have it:
  `npm install knex --global`
  Next, navigate to your config directory and run the following command to execute our migration and create our table with columns:
  `knex migrate:latest`


  ![migration](http://alexmurphy.me/img/neap_template/migration.png)
  ![dbtable](http://alexmurphy.me/img/neap_template/dbtable.png)



  From there, you can declare your database table and use bookshelf.js in conjunction with bookshelf-modelbase to append data into your table. See the following example, In this case I am appending data into my DB based on a POST route:

  ```javascript
  var yourTable = ModelBase.extend({
    tableName: 'YOUR_TABLE_NAME_HERE'
  });

  // api route
  router.route('/logToDatabase').post(function(req, res) {
    yourTable.create({ 'post_body' : req.body })
      .catch((error) => {
        console.log(error)
        res.send("error")
      })
      .then((collection) => {
        console.log( 'record added:' + collection )
        res.send('Record added to DB')
      })
  })
  ```
#### Next, use PostMan to test our route.
  ![postman](http://alexmurphy.me/img/neap_template/postman.png)
#### And our final result, a record in our DB!!!!
  ![dbrecord](http://alexmurphy.me/img/neap_template/dbrecord.png)
