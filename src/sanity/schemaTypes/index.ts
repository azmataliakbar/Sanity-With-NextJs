import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author],
}

/* https://youtu.be/flQ0hzAjk_o?si=O1SCE50ExSdQakPV */
