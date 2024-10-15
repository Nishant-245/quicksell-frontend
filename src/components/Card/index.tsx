import React from "react";
import "./card.css";
import UserIcon from "../UserIcon";
import { LuMoreHorizontal } from "react-icons/lu";
import { Ticket, User } from "../../interfaces";
import { getStatusIcon } from "../../utils/helper";

interface CardProps {
  ticket: Ticket;
  userData: User;
  hideStatusIcon: boolean;
  hideProfileIcon: boolean;
}

const Card: React.FC<CardProps> = ({
  ticket,
  userData,
  hideStatusIcon,
  hideProfileIcon,
}) => {
  return (
    <div className="card-wrapper">
      {/* Top section with ticket ID and optional profile icon */}
      <div className="header-row">
        <span className="ticket-number">{ticket.id}</span>
        {!hideProfileIcon && (
          <UserIcon name={userData.name} available={userData.available} />
        )}
      </div>

      {/* Middle section with status icon and title */}
      <div className="content-row">
        {!hideStatusIcon && getStatusIcon(ticket.status)}
        <h3 className="ticket-title">{ticket.title}</h3>
      </div>

      {/* Bottom section with tag list and more options icon */}
      <div className="footer-row">
        <div className="icon-button">
          <LuMoreHorizontal color="#797d84" />
        </div>

        {ticket.tag.map((tag: string) => (
          <div key={tag} className="label-wrapper">
            <span className="label-icon"></span>
            <span className="label-text">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
