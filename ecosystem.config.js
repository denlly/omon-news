module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: "omon-new",
      script: "app.js",
      env: {
        // 生产环境启动快速编译模式，忽略静态类型检查
        TS_NODE_TRANSPILE_ONLY: "true",
      },
      env_production: {
        NODE_ENV: "production"
      },
      env_staging: {
        NODE_ENV: "staging"
      }
    }
    // // Second application
    // {
    //   name: 'WEB',
    //   script: 'web.js'
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-18-188-236-135.us-east-2.compute.amazonaws.com',
      ref: 'origin/master',
      repo: 'git@github.com:denlly/omon-news.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    staging: {
      key: "./ops/aws/ec2/omon-hash.pem",
      user: "ec2-user",
      host: "18.188.236.135",
      ref: "origin/develop",
      repo: "https://github.com/denlly/omon-news.git",
      path: "/home/webroot/omon-news",
      // To prepare the host by installing required software (eg: git)
      // even before the setup process starts
      // can be multiple commands separated by the character ";"
      // or path to a script on your local machine
      // 'pre-setup': 'apt-get install git',
      "pre-setup": "sudo timedatectl set-timezone Asia/Shanghai && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash && source /home/ubuntu/.zshrc && nvm install 8.10.0 && npm i -g yarn pm2 && pm2 install pm2-papertrail && pm2 set pm2-papertrail:host logs6.papertrailapp.com && pm2 set pm2-papertrail:port 20337",
      // Commands / path to a script on the host machine
      // This will be executed on the host after cloning the repository
      // eg: placing configurations in the shared dir etc
      "post-setup": "ls -la",
      // !!!!!!!!!!!!!!!!!!!!
      // !!!!!!!!!!!!!!!!
      // !!!!!!!!!!!!!!!!
      // !!!!!!!!!!!!! 此处会运行数据库修改脚本，谨慎运行
      // "pre-deploy": "NODE_ENV=staging yarn run migrations:run",
      // Commands to be executed on the server after the repo has been cloned
      "post-deploy": "yarn install && NODE_ENV=staging yarn run build && pm2 reload ecosystem.config.js --env staging",
    },
  }
};
