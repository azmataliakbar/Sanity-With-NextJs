
import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';


export const post = defineType( {
  name: 'post',
  type: 'document',
  title: 'Post',
  icon: DocumentTextIcon,
  fields:[
    defineField({
      name: 'title',
      type: 'string',
      title: 'My First Post',
      description: 'Title of the post',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      title: 'My Logo',
      name: 'mylogo',
      type: 'image',
      options: {
    hotspot: true, // Optional, to enable cropping in the studio
  },
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block'
        })
      ]
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'gender',
      type: 'string',
      title: 'Gender',
      options:{
              list:[
        { value: 'male', title: 'Male' },
        { value: 'female', title: 'Female' },
        { value: 'other', title: 'Other' }
        ],
        layout: 'radio'
      }
    }),
  ]
})