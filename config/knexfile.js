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
