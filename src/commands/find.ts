import fse = require('fs-extra');
import os = require('node:os');
// import EasyTable = require('easy-table')
import path = require('path');
import fs = require('node:fs');
import {Command, Flags} from '@oclif/core'
import EasyTable from 'easy-table'
import {IProjectInfo} from '../types/types';

const arr : string[] = []

export default class Find extends Command {
  public EXCLUDED_DIRECTORIES = ['node_modules', '.svn', '.hg', '.next', '.cache', '.dist', '.out', '.build', '.tmp', '.temp', '.git', '.vscode', '.idea', '.vs', '.github', '.circleci']

  static description = 'Recursively find folders containing a package.json file'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    help: Flags.help({char: 'h'}),
    depth: Flags.integer({char: 'd', description: 'depth of the search'}),
  }

  static args = [{name: 'path', description: 'path to search'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Find)

    const path = args.path || process.cwd()
    const depth = flags.depth || 5
    // let results : any = []

    try {
      await this.search(this.validatePath(path), depth)
    } catch (error: any) {
      this.log(error?.message)
    }

    const projectInfoArray = await this.getProjectsInfoArray(arr)
    this.printInfoArray(projectInfoArray)

    this.log(`Found ${arr.length} package.json files`)
  }

  private async search(dirPath: string, depth: number): Promise<string[]> {
    if (depth === 0) {
      return []
    }

    const allContent : fs.Dirent[] = await fse.readdir(path.resolve(dirPath), {withFileTypes: true})
    const directories = allContent.filter(content => content.isDirectory() && !this.EXCLUDED_DIRECTORIES.includes(content.name))
    allContent.some(content => content.name === 'package.json') ? arr.push(dirPath) : null

    const results = await Promise.all(directories.map(async directory => {
      return this.search(path.join(dirPath, directory.name), depth - 1)
    }))
    return results.flat()
  }

  private validatePath(searchDirPath: string): string {
    /**
     * TODO: validate path string
     */
    if (searchDirPath.startsWith('~')) {
      searchDirPath = searchDirPath.replace('~',
        os.homedir())
    }

    const resolvedPath = path.resolve(searchDirPath)
    if (!fse.existsSync(resolvedPath)) {
      throw new Error(`Path ${searchDirPath} does not exist`)
    }

    const stats = fse.statSync(resolvedPath)
    const isDirectory = stats.isDirectory()

    if (isDirectory) {
      return resolvedPath
    }

    throw new Error(`Path ${searchDirPath} is not a directory`)
  }

  private async scanProject(pathToDir: string): Promise<IProjectInfo> {
    // we want to get the project name, the project path, the project type, the project version
    // by parsing the package.json file
    const packageJsonPath = path.join(pathToDir, 'package.json')
    const packageJson = await fse.readJSON(packageJsonPath)
    const projectName = packageJson.name
    const projectVersion = packageJson.version
    // check content of dependencies
    const dependencies = packageJson.dependencies
    const devDependencies = packageJson.devDependencies
    const allDependencies = {...dependencies, ...devDependencies}
    // check if dependencies contains popular packages like express, vue, react, etc
    const popularPackages = ['express', 'vue', 'react', 'angular', 'nestjs', 'vite', 'graphql']

    const includedPopularPackages = popularPackages.filter(packageName => {
      return allDependencies[packageName] !== undefined
    })

    const projectDescription = packageJson.description
    const packages = includedPopularPackages.length > 0 ? includedPopularPackages.join(', ') : 'unknown'
    return {projectName, projectVersion, packages, description: projectDescription, projectPath: pathToDir}
  }

  private async getProjectsInfoArray(pathArray: string[]): Promise<Array<IProjectInfo>> {
    return Promise.all(pathArray.map(async path => {
      const projectInfo = await this.scanProject(path)
      return {...projectInfo, path}
    }))
  }

  private printInfoArray(infoArray:Array<IProjectInfo>):void {
    const t = new EasyTable()
    for (const projectInfo of infoArray) {
      t.cell('Name', projectInfo.projectName)
      t.cell('Version', projectInfo.projectVersion)
      t.cell('Packages', projectInfo.packages)
      t.cell('Description', projectInfo.description)
      t.cell('Path', projectInfo.projectPath)
      t.newRow()
    }

    this.log('----')
    console.log(t.toString())
    this.log('----')
  }
}
