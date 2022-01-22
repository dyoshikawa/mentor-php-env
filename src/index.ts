#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import path from 'path'

const main = async (): Promise<void> => {
  const program = new Command()
  // eslint-disable-next-line import/no-dynamic-require, global-require
  program.version(require(path.join(__dirname, '../package.json')).version)

  program.parse(process.argv)

  // Docker環境ファイルを作成
  const baseDir = path.join(__dirname, '../resources/')
  fs.copyFileSync(
    path.join(baseDir, '../resources/docker-compose.yml'),
    './docker-compose.yml'
  )
  fs.copyFileSync(
    path.join(baseDir, '../resources/app.Dockerfile'),
    './app.Dockerfile'
  )
  fs.copyFileSync(path.join(baseDir, '../resources/php.ini'), './php.ini')
  fs.copyFileSync(
    path.join(baseDir, '../resources/db.Dockerfile'),
    './db.Dockerfile'
  )
  fs.copyFileSync(path.join(baseDir, '../resources/my.cnf'), './my.cnf')

  // .envを作成
  fs.copyFileSync('./.env.example', './.env')
  const appServiceProviderPath = path.join(
    process.cwd(),
    'app/Providers/AppServiceProvider.php'
  )

  // '\URL::forceScheme('https');' を削除
  const appServiceProviderContent = fs
    .readFileSync(appServiceProviderPath)
    .toString()
  const newAppServiceProviderContent = appServiceProviderContent.replace(
    "\\URL::forceScheme('https');",
    ''
  )
  fs.writeFileSync(appServiceProviderPath, newAppServiceProviderContent)
}

main()
