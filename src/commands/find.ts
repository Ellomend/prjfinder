// fs
import fse = require('fs-extra');


import { Command, Flags } from '@oclif/core'
import path = require('path')

export default class Find extends Command {

  public foundFolders: string[];

  constructor(argv: string[], config: any) {
    super(argv, config)
    this.foundFolders = []
  }

  public EXCLUDED_DIRECTORIES = [
    'node_modules',
    '.svn',
    '.hg',
    '.next',
    '.cache',
    '.dist',
    '.out',
    '.build',
    '.tmp',
    '.temp',
    '.git',
    '.vscode',
    '.idea',
    '.vs',
    '.github',
    '.circleci'
  ]

  static description = 'Recursively find folders containing a package.json file'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    help: Flags.help({ char: 'h' }),
    depth: Flags.integer({ char: 'd', description: 'depth of the search' }),
  }

  static args = [{ name: 'path', description: 'path to search' }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Find)

    // next we need to get the path to search
    const path = args.path ?? process.cwd()

    // next we need to get the depth of the search
    const depth = flags.depth ?? 3

    this.log(`Searching for package.json files in ${path} with a depth of ${depth}`)

    const results = await this.search(path, depth)

    this.printResults(results)

    this.log(`Found ${results.length} package.json files`)

    this.foundFolders = results;

    return

  }

  // overall search algorithm would be as follows:
  // 1. get the current directory
  // 2. get the list of files in the current directory
  // 3. if the list of files contains a package.json file, add the current directory to the list of results
  // 4. if the list of files contains directories, recursively call the search algorithm on each directory
  // 5. return the list of results
  // 6. print the list of results
  // 7. exit
  // 8. profit
  // We can use the depth parameter to limit the depth of the search
  // We can use the path parameter to specify the path to search
  // We want to use the async/await syntax to make the code more readable
  // We want to use the fs-extra library to make the code more readable
  // We want to use the path library to make the code more readable
  // We want to use the chalk library to make the code more readable
  // We want to use the cli-ux library to make the code more readable
  // We want to skip searching these directories:
  // - node_modules
  // - .git
  // - .svn
  // - .hg
  // - .idea
  // - .vscode
  // - .next
  // - .cache
  // - .dist
  // - .out
  // - .build
  // - .tmp
  // - .temp
  // If the path parameter is not specified, we want to search the current directory
  // If the depth parameter is not specified, we want to search the current directory and 10 subdirectories deep
  // If the depth parameter is 0, we want to search the current directory only
  // If the depth parameter is 1, we want to search the current directory and 1 subdirectory deep
  // To optimize the search, we want to search each subdirectory in parallel
  // To optimize the search, we want to search each subdirectory in parallel, but only up to 10 subdirectories at a time
  // For security reasons, we want to limit the depth of the search to 100
  // make sure to use the async/await syntax
  // make sure to use the fs-extra library
  // make sure to use the path library
  // make sure to use the chalk library
  // implementations should be in the src/commands/find.ts file
  // TODO: do not search the following directories:
  // - node_modules
  // - .git
  // - .svn
  // - .hg
  // - .idea
  // - .vscode
  // - .next
  // - .cache
  // - .dist
  // - .out
  // - .build
  // - .tmp
  // - .temp




  // first we need to get the current directory
  // we can use the process.cwd() method to get the current directory
  // we can use the path.resolve() method to resolve the current directory
  private getCurrentDirectory(): string {
    return path.resolve(process.cwd())
  }

  // next we need to get the list of files in the current directory
  // we can use the fs-extra.readdir() method to get the list of files in the current directory
  private async getDirectoryContents(path: string): Promise<string[]> {
    return await fse.readdir(path || this.getCurrentDirectory())
  }

  // next we need to filter the list of files to only include directories
  // we can use the fs-extra.stat() method to get the stats of each file
  private async filterContentsToOnlyIncludeDirectories(files: string[]): Promise<string[]> {
    return await Promise.all(files.filter(async file => {
      const stats = await fse.stat(file)
      // we can use the fs-extra.stat() method to get the stats of each file
      // we are only interested in directories not with the name from the EXCLUDED_DIRECTORIES array
      return stats.isDirectory() && !this.EXCLUDED_DIRECTORIES.includes(file)
    }))
  }

  // next we need to check if the list of files contains a package.json file
  // we can use the Array.includes() method to check if the list of files contains a package.json file
  private containsPackageJsonFile(files: string[]): boolean {
    return files.includes('package.json')
  }

  // next we need to implement the search method
  private async search(path: string, depth: number = 3): Promise<string[]> {
    // this is recursive, so we need to fail fast.
    // perform a check to see if the depth is 0
    // if the depth is 0, return an empty array
    if (depth === 0) {
      return []
    }

    // next we need to get the list of files in the current directory
    // we can use the getDirectoryContents() method to get the list of files in the current directory
    const files = await this.getDirectoryContents(path)

    // next we need to filter the list of files to only include directories
    // we can use the filterContentsToOnlyIncludeDirectories() method to filter the list of files to only include directories
    const directories = await this.filterContentsToOnlyIncludeDirectories(files)

    // next we need to check if the list of files contains a package.json file
    // we can use the containsPackageJsonFile() method to check if the list of files contains a package.json file
    const containsPackageJson = this.containsPackageJsonFile(files)

    // next we need to implement the search algorithm
    // we can use the Promise.all() method to search each subdirectory in parallel
    // we can use the search() method to search each subdirectory
    const results = await Promise.all(directories.map(async directory => {
      return await this.search(directory, depth - 1)
    }))

    // next we need to flatten the results
    // we can use the Array.flat() method to flatten the results
    const flattenedResults = results.flat()

    // next we need to add the current directory to the list of results if the list of files contains a package.json file
    // we can use the Array.concat() method to add the current directory to the list of results if the list of files contains a package.json file
    const finalResults = containsPackageJson ? flattenedResults.concat(path) : flattenedResults

    // next we need to return the list of results
    return finalResults
  }



  // next we need to implement the printResults method
  private printResults(results: string[]): void {
    // next we need to print the list of results
    // we can use the Array.forEach() method to print the list of results
    results.forEach(result => {
      this.log(result)
    })
  }

}
