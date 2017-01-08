export type ServeConfig = {
  dir?: string
  port?: number
  host?: string
}

export type RunConfig = {
  cmd: string
  watch: string[]
  reload?: /** Default */'all' | 'css' | 'none'
  args?: string[]
  keepAlive?: boolean
}

export type StartsConfig = {
  verbose?: boolean
  serve?: ServeConfig
  run?: RunConfig[]
  /** autorun initially */
  initialRun?: boolean
}
