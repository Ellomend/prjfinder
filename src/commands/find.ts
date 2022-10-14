import fse = require('fs-extra')
import os = require('node:os')
import {Command, Flags} from '@oclif/core'
// import EasyTable = require('easy-table')
import path = require('path')
import fs = require('node:fs')

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
    let results : any = []

    try {
      results = await this.search(this.validatePath(path), depth)
    } catch (error: any) {
      this.log(error?.message)
    }

    this.printResults(results)

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

  private printResults(res:any): void {
    this.log('arr', arr as string[])
    this.log('Found package.json files:', arr.length, res)
  }
}
