import UserItem from "./UserItem";
import "./UsersList.css";

export default function UsersList({ users }) {
  if (users.length === 0) {
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <div>
      <ul className="users-list">
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </ul>
    </div>
  );
}
