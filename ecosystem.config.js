export default [
    {
        apps: [
            {
                name: "dundeal",
                script: "./app.js",
                instances: "max",
                exec_mode: "cluster",
                env: {
                    NODE_ENV: "development",
                },
                env_production: {
                    NODE_ENV: "production",
                },
            },
        ],
    }
];