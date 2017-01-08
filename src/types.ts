export type ServeConfig = {
  dir?: string
  port?: number
  host?: string
}

export type RunConfig = {
  cmd: string
  include: string[]
  exclude?: string[]
  reload?: 'all', 'css'
}

export type StartsConfig = {
  verbose?: boolean
  serve?: ServeConfig
  run?: RunConfig[]
}
