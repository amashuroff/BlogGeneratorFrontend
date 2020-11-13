const Articles = [
  {
    id: "title",
    align: "left",
    disablePadding: true,
    label: "Title",
    sortBy: "sortByTitle",
    filterBy: "filterByTitle",
  },
  {
    id: "topic",
    align: "center",
    disablePadding: false,
    label: "Topic",
    sortBy: "sortByTopic",
    filterBy: "filterByTopic",
  },
  {
    id: "language",
    align: "center",
    disablePadding: false,
    label: "Language",
    sortBy: "sortByLanguage",
    filterBy: "filterByLanguage",
  },
  {
    id: "createdAt",
    align: "right",
    disablePadding: false,
    label: "Created date",
    sortBy: "sortByCreatedAt",
    filterBy: "filterByCreatedDate",
  },
];

const Topics = [
  {
    id: "name",
    align: "center",
    disablePadding: false,
    label: "Topic",
    sortBy: "sortByName",
  },
  {
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Created date",
    sortBy: "sortByCreatedAt",
  },
];

const Languages = [
  {
    id: "name",
    align: "center",
    disablePadding: false,
    label: "Language",
    sortBy: "sortByName",
  },
  {
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Created date",
    sortBy: "sortByCreatedAt",
  },
];

export default {
  Articles,
  Topics,
  Languages,
};
