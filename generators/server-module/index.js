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
          'server-module'
        )}`
      )
    )

    this.answers = await this.prompt([
      {
        name: 'moduleName',
        message: 'What is your module name?',
        default: path.basename(process.cwd())
      }
    ])

    this.answers.uccModuleName = _.upperFirst(
      _.camelCase(this.answers.moduleName)
    )
    this.answers.lccModuleName = _.lowerCase(
      _.camelCase(this.answers.moduleName)
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
      this.destinationPath('src/controllers/ModuleController.ts'),
      this.destinationPath(
        `src/controllers/${this.answers.uccModuleName}Controller.ts`
      )
    )

    this.fs.move(
      this.destinationPath('src/entities/Module.ts'),
      this.destinationPath(`src/entities/${this.answers.uccModuleName}.ts`)
    )

    this.fs.move(
      this.destinationPath('src/entities/AbstractModule.ts'),
      this.destinationPath(
        `src/entities/Abstract${this.answers.uccModuleName}.ts`
      )
    )

    this.fs.move(
      this.destinationPath('src/routers/ModuleRouter.ts'),
      this.destinationPath(`src/routers/${this.answers.uccModuleName}Router.ts`)
    )
  }

  install() {
    this.yarnInstall([
      '@m2fw/base-controller',
      '@m2fw/datasource',
      '@m2fw/menu',
      'body-parser',
      'express',
      'reflect-metadata',
      'sqlite3',
      'typeorm'
    ])

    this.yarnInstall(['@types/express', 'ts-node', 'typescript'], {
      dev: true
    })
  }
}