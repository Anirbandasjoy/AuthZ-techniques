const roleHierarchy: { [key: string]: string[] } = {
  superAdmin: ["admin", "editor", "viewer"],
  admin: ["manager"],
  manager: ["user"],
  proof_reader: [],
  editor: [],
  viewer: [],
  user: [],
};
