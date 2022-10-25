interface IUser {
  id: number,
  name: string,
  email: string,
  password: string,
  role: "Admin" | "User"
};

export { IUser };