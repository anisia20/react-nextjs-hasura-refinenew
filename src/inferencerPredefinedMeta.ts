/**
 * This `meta` object is used to define the necessary metadata for inferencer to work with.
 *
 * They will be used to infer the fields of the response of the data provider.
 * Also they will be included in the generated code, making them easily editable after you generate the boilerplate code for your resource.
 */
export const inferencerPredefinedMeta = {
  viewstat: {
    getList: {
      fields: [
        "id",
        "idsk",
        "compname",
        "viewcnt",
        "ins_ds",
      ],
    },
    getOne: {
      fields: ["idsk", "compname", "viewcnt", "ins_ds"],
    },
  },
};
