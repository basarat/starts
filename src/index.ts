import { StartsConfig } from "./types";
import { serve } from "./internal/serve/serve";

export function starts(config: StartsConfig) {
  if (config.serve) {
    serve(config.serve);
  }
}