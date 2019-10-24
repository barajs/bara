import { Stream } from 'xstream'
import { PrimaryChain } from './chain'
import { BaraLinker } from './linker'
import { StreamPayload } from './stream'

export interface BaraTriggerPayload {
  portionName: string
  flowName: string
  chain: PrimaryChain[]
  seep: any
}

export interface BaraTriggerSubscriber {
  stream: Stream<any>
  action: (payload: StreamPayload) => any[] | any | void | undefined
}

export interface BaraTriggerConfig {
  func: (
    chain: PrimaryChain[],
    upstream: Stream<any>,
  ) => BaraTriggerSubscriber[]
  rawTrigger: BaraTriggerPayload
}

export const initTrigger = (
  rawTrigger: BaraTriggerPayload,
  linker: BaraLinker,
): BaraTriggerConfig => {
  const func = (chains: PrimaryChain[], upstream: Stream<any>) => {
    const subscribers: BaraTriggerSubscriber[] = chains.map(chain => {
      const nextStream = chain.link(upstream, linker)
      return {
        stream: nextStream,
        action: chain.func,
      }
    })
    return subscribers
  }
  return { func, rawTrigger }
}