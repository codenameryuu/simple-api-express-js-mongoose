const toJSON = (schema: any) => {
  let transform: Function;

  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    versionKey: false,
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    transform(doc: Document, ret: any, options: Record<string, any>) {
      delete ret.id;
      delete ret.password;
      delete ret.is_deleted;
      delete ret.deleted_at;

      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

export default toJSON;
