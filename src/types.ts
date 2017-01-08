export type ServeConfig = {
  dir?: string
  port?: number
  host?: string
}
export type StartsConfig = {
  verbose?: boolean
  serve?: ServeConfig
};