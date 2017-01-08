export type ServeConfig = {
  dir?: string
  port?: number
  host?: string
}

export type RunConfig = {
  cmd: string
  watch: string[]
  reload?: /** Default */ 'all' | 'css' | 'none'
  keepAlive?: boolean
}

/**
 * The complete config
 */
export type StartsConfig = {
  verbose?: boolean
  serve?: ServeConfig
  run?: RunConfig[]
  /** autorun initially */
  initialRun?: boolean
}
