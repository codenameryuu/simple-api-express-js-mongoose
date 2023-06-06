import mongoose, { CallbackError, SaveOptions } from "mongoose";

const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  });

  schema.pre(
    "find",
    async function (this, next: (err?: CallbackError) => void) {
      const withDeleted = this.getOptions().withDeleted;

      if (withDeleted) {
        this.setQuery({ ...this.getFilter(), is_deleted: { $ne: false } });
        return next();
      }

      this.setQuery({ ...this.getFilter(), is_deleted: { $ne: true } });
      next();
    }
  );

  schema.pre(
    "findOne",
    async function (this, next: (err?: CallbackError) => void) {
      const withDeleted = this.getOptions().withDeleted;

      if (withDeleted) {
        this.setQuery({ ...this.getFilter(), is_deleted: { $ne: false } });
        return next();
      }

      this.setQuery({ ...this.getFilter(), is_deleted: { $ne: true } });
      next();
    }
  );

  schema.pre(
    "count",
    async function (this, next: (err?: CallbackError) => void) {
      const withDeleted = this.getOptions().withDeleted;

      if (withDeleted) {
        this.setQuery({ ...this.getFilter(), is_deleted: { $ne: false } });
        return next();
      }

      this.setQuery({ ...this.getFilter(), is_deleted: { $ne: true } });
      next();
    }
  );

  schema.pre(
    "countDocuments",
    async function (this, next: (err?: CallbackError) => void) {
      const withDeleted = this.getOptions().withDeleted;

      if (!withDeleted) {
        this.setQuery({ ...this.getFilter(), is_deleted: { $ne: false } });
        return next();
      }

      this.setQuery({ ...this.getFilter(), is_deleted: { $ne: true } });
      next();
    }
  );

  schema.static("findWithDeleted", async function (query) {
    const updatedQuery = {
      ...query,
      is_deleted: false,
    };

    return this.find(updatedQuery);
  });

  schema.static("restore", async function (query) {
    const updatedQuery = {
      ...query,
      is_deleted: true,
    };

    const deletedTemplates = await this.find(updatedQuery);

    if (!deletedTemplates) {
      return Error("element not found");
    }

    let restored = 0;

    for (const deletedTemplate of deletedTemplates) {
      if (deletedTemplate.is_deleted) {
        deletedTemplate.is_deleted = false;
        deletedTemplate.deleted_at = null;

        await deletedTemplate
          .save()
          .then(() => restored++)
          .catch((e: mongoose.Error) => {
            throw new Error(e.name + " " + e.message);
          });
      }
    }
    return { restored };
  });

  schema.static("softDelete", async function (query, options?: SaveOptions) {
    const templates = await this.find(query);

    if (!templates) {
      return Error("Element not found");
    }

    let deleted = 0;

    for (const template of templates) {
      if (!template.isDeleted) {
        template.is_deleted = true;
        template.deleted_at = new Date();

        await template
          .save(options)
          .then(() => deleted++)
          .catch((e: mongoose.Error) => {
            throw new Error(e.name + " " + e.message);
          });
      }
    }
    return { deleted };
  });
};

export default softDeletePlugin;
