/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
    apps: [
        {
            name: "prod", // pm2 start App name
            script: "node", // ts-node
            args: "MODE=production ./dist/server.js", // ts-node args
            exec_mode: "fork", // 'cluster' or 'fork'
            instance_var: "INSTANCE_ID", // instance variable
            instances: 1, // pm2 instance count
            autorestart: true, // auto restart if process crash
            watch: true, // files change automatic restart
            ignore_watch: ["node_modules", "logs", "dist"], // ignore files change
            max_memory_restart: "1G", // restart if process use more than 1G memory
            merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
            output: "./logs/pm_access.log", // pm2 log file
            error: "./logs/pm_error.log", // pm2 error log file
            // env: {
            //   // environment variable
            //   PORT: 3000,
            // },
        },
    ],
};
