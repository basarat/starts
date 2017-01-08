export type ServeConfig = {
  dir?: string
  port?: number
  host?: string
}

export type RunConfig = {
  command: string, 
}

export type StartsConfig = {
  verbose?: boolean
  serve?: ServeConfig
  run?: RunConfig[]
}
