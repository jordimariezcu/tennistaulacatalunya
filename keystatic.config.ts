import { config, collection, fields } from '@keystatic/core';

const postFields = {
  title: fields.text({ label: 'Títol' }),
  description: fields.text({ label: 'Descripció', multiline: true }),
  pubDate: fields.date({ label: 'Data de publicació' }),
  updatedDate: fields.date({ label: 'Data d\'actualització' }),
  tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
  draft: fields.checkbox({ label: 'Esborrany', defaultValue: false }),
};

export default config({
  storage: { kind: 'github', repo: 'jordimariezcu/tennistaulacatalunya' },
  collections: {
    fustes: collection({
      label: 'Fustes',
      slugField: 'title',
      path: 'src/content/fustes/*',
      format: { contentField: 'content' },
      schema: {
        ...postFields,
        content: fields.markdoc({ label: 'Contingut' }),
      },
    }),
    configuracions: collection({
      label: 'Configuracions',
      slugField: 'title',
      path: 'src/content/configuracions/*',
      format: { contentField: 'content' },
      schema: {
        ...postFields,
        content: fields.markdoc({ label: 'Contingut' }),
      },
    }),
    guies: collection({
      label: 'Guies',
      slugField: 'title',
      path: 'src/content/guies/*',
      format: { contentField: 'content' },
      schema: {
        ...postFields,
        content: fields.markdoc({ label: 'Contingut' }),
      },
    }),
    gomes: collection({
      label: 'Gomes',
      slugField: 'title',
      path: 'src/content/gomes/*',
      format: { contentField: 'content' },
      schema: {
        ...postFields,
        content: fields.markdoc({ label: 'Contingut' }),
      },
    }),
    noticies: collection({
      label: 'Notícies',
      slugField: 'title',
      path: 'src/content/noticies/*',
      format: { contentField: 'content' },
      schema: {
        ...postFields,
        content: fields.markdoc({ label: 'Contingut' }),
      },
    }),
  },
});
