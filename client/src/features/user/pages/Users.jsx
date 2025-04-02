import UsersList from "../components/UsersList";

export default function Users() {
  const users = [
    { id: "ul", name: "Max Schawaz", image: "https://random.photo", places: 3 },
    { id: "u2", name: "Jon Doe", image: "https://random.photo", places: 3 },
  ];

  return <UsersList users={users} />;
}
