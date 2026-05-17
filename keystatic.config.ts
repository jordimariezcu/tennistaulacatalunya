import { config, collection, fields } from '@keystatic/core';

const isProduction = import.meta.env.PROD;

const contentField = fields.markdoc({
  label: 'Contingut',
  extension: 'md',
});

const postFields = {
  title: fields.slug({ name: { label: 'Títol' } }),
  description: fields.text({ label: 'Descripció', multiline: true }),
  pubDate: fields.date({ label: 'Data de publicació' }),
  updatedDate: fields.date({ label: 'Data d\'actualització' }),
  tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
  draft: fields.checkbox({ label: 'Esborrany', defaultValue: false }),
};

export default config({
  storage: isProduction
    ? { kind: 'github', repo: { owner: 'jordimariezcu', name: 'tennistaulacatalunya' } }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Tennis Taula Catalunya' },
    navigation: {
      Contingut: ['fustes', 'configuracions', 'guies', 'gomes', 'noticies'],
    },
  },

  collections: {
    fustes: collection({
      label: 'Fustes',
      slugField: 'title',
      path: 'src/content/fustes/*',
      format: { contentField: 'content' },
      schema: { ...postFields, content: contentField },
    }),
    configuracions: collection({
      label: 'Configuracions',
      slugField: 'title',
      path: 'src/content/configuracions/*',
      format: { contentField: 'content' },
      schema: { ...postFields, content: contentField },
    }),
    guies: collection({
      label: 'Guies',
      slugField: 'title',
      path: 'src/content/guies/*',
      format: { contentField: 'content' },
      schema: { ...postFields, content: contentField },
    }),
    gomes: collection({
      label: 'Gomes',
      slugField: 'title',
      path: 'src/content/gomes/*',
      format: { contentField: 'content' },
      schema: { ...postFields, content: contentField },
    }),
    noticies: collection({
      label: 'Notícies',
      slugField: 'title',
      path: 'src/content/noticies/*',
      format: { contentField: 'content' },
      schema: { ...postFields, content: contentField },
    }),
  },
});
