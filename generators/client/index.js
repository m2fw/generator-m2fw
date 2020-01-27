const Generator = require('yeoman-generator')
const yosay = require('yosay')
const chalk = require('chalk')
const path = require('path')
const _ = require('lodash')

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Welcome to ${chalk.blue('M2 framework generator')} for ${chalk.red(
          'client'
        )}`
      )
    )
    this.answers = await this.prompt([
      {
        name: 'appName',
        message: 'What is your application name?',
        default: 'Application Name'
      },
      {
        name: 'mainComponent',
        message: 'What is your main component name?',
        default: 'm2-app'
      },
      {
        name: 'moduleName',
        message: 'What is your module name?',
        default: path.basename(process.cwd())
      },
      {
        name: 'runningPort',
        message: 'Running port for webserver',
        default: 4000
      }
    ])

    this.answers.uccMainComponent = _.upperFirst(
      _.camelCase(this.answers.mainComponent)
    )
  }

  writing() {
    this.fs.copyTpl(
      [this.templatePath() + '/**/*'],
      this.destinationPath(),
      this.answers,
      {},
      { globOptions: { dot: true } }
    )

    this.fs.move(
      this.destinationPath('src/main-app.js'),
      this.destinationPath(`src/${this.answers.mainComponent}.js`)
    )
  }

  install() {
    /* Install 3rd party dependencies */
    this.yarnInstall(['lit-element', 'pwa-helpers', 'redux', 'redux-thunk'])
    /* Install M2FW dependencies */
    this.yarnInstall(['@m2fw/redux-manager', '@m2fw/router'])
    /* Install Dev dependencies */
    this.yarnInstall(
      [
        '@babel/cli',
        '@babel/core',
        '@babel/preset-env',
        'babel-loader',
        'html-webpack-plugin',
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'style-loader',
        'css-loader'
      ],
      {
        dev: true
      }
    )
  }
}