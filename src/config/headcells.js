const Articles = [
  {
    id: "title",
    align: "left",
    disablePadding: true,
    label: "Title",
    sortBy: "SortByTitle",
    filterBy: "FilterByTitle",
  },
  {
    id: "topic",
    align: "center",
    disablePadding: false,
    label: "Topic",
    sortBy: "SortByTopic",
    filterBy: "FilterByTopic",
  },
  {
    id: "language",
    align: "center",
    disablePadding: false,
    label: "Language",
    sortBy: "SortByLanguage",
    filterBy: "FilterByLanguage",
  },
  {
    id: "createdAt",
    align: "right",
    disablePadding: false,
    label: "Created date",
    sortBy: "SortByCreatedAt",
    filterBy: "FilterByCreatedDate",
  },
];

const Topics = [
  {
    id: "name",
    align: "center",
    disablePadding: false,
    label: "Topic",
    sortBy: "SortByName",
  },
  {
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Created date",
    sortBy: "SortByCreatedAt",
  },
];

const Languages = [
  {
    id: "name",
    align: "center",
    disablePadding: false,
    label: "Language",
    sortBy: "SortByName",
  },
  {
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Created date",
    sortBy: "SortByCreatedAt",
  },
];

export default {
  Articles,
  Topics,
  Languages,
};
