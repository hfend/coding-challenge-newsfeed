import { enumType } from 'nexus'


export const Fellowship = enumType({
  name: 'Fellowship',
  members: ['founders', 'angels', 'writers'],
})
