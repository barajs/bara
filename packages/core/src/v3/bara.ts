import { BaraContext } from './context'
import { BaraApplication } from './app'

export interface BaraRunOptions {
  dev?: boolean
}

/* Run Bara Application */
export const run = (app: BaraApplication, options?: BaraRunOptions) => {
  // There will be one singleton for entire application Context
  const context: BaraContext = {}
  const { portions, triggers } = app
  const all$ = wirePortion(portions)
  return { context }
}

/**
 * Map each portion's stream into global stream.
 *
 * @param portion
 */
const wirePortion = (portion: any) => {}

const wireTrigger = () => {}

/**
 * Create main Bara application
 * @param payload Application parameter
 */
export const addContext = (ctx: any) => (context: BaraContext) => {
  const ctxId = 'ctx-'
  context[ctxId] = ctx
}
