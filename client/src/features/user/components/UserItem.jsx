import "./UserItem.css";
import Avatar from "../../../app/shared/components/UIElements/Avatar";
import User from "../../../assets/user.png";
import Card from "../../../app/shared/components/UIElements/Card";
import { Link } from "react-router-dom";

export default function UserItem({ user }) {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <Card>
          <Link to={`/${user.id}/places`}>
            <div className="user-item__image">
              <Avatar image={User} alt={user.name} />
            </div>
            <div className="user-item__info">
              <h2>{user.name}</h2>
              <h3>
                {user.places} {user.places === 1 ? "Place" : "Places"}
              </h3>
            </div>
          </Link>
        </Card>
      </div>
    </li>
  );
}
