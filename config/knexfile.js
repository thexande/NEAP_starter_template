// Update with your config settings.
module.exports = {
    // development configuration for local PG
    development: {
        client: 'pg',
        connection: 'postgres://localhost/NEAP_starter_template',
        migrations: {
            'directory': __dirname + "/migrations",
            tableName: "users"
        }
    }
}
