module.exports = {
  apps: [
    {
      name: "tools-app",
      script: "./main.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      watch: true,
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
