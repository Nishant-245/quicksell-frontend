import React, { useMemo } from "react";
import Card from "../Card";
import "./column.css";
import { GrAdd } from "react-icons/gr";
import { LuMoreHorizontal } from "react-icons/lu";
import { Ticket, User } from "../../interfaces";
import { getPriorityIcon, getStatusIcon } from "../../utils/helper";
import UserIcon from "../UserIcon";

interface ColumnProps {
  tickets: Ticket[];
  grouping: string;
  groupBy: string;
  userIdToData: Record<string, User>;
}

const Column: React.FC<ColumnProps> = ({
  tickets,
  grouping,
  groupBy,
  userIdToData,
}) => {
  const title = useMemo(() => {
    switch (grouping) {
      case "status":
        return groupBy;
      case "priority":
        return groupBy;
      case "user":
        return userIdToData[groupBy]?.name;
      default:
        return "";
    }
  }, [grouping, groupBy, userIdToData]);

  const icon = useMemo(() => {
    switch (grouping) {
      case "status":
        return getStatusIcon(groupBy);
      case "priority":
        return getPriorityIcon(groupBy);
      case "user":
        return (
          <UserIcon
            name={userIdToData[groupBy]?.name}
            available={userIdToData[groupBy]?.available}
          />
        );
      default:
        return null;
    }
  }, [grouping, groupBy, userIdToData]);

  return (
    <div className="task-column">
      <div className="header">
        <div className="header-left">
          {icon}
          <div className="header-title">
            {title}
            <span className="item-count">({tickets.length})</span>
          </div>
        </div>
        <div className="header-right">
          <GrAdd color="#797d84" size={12} />
          <LuMoreHorizontal color="#797d84" size={14} />
        </div>
      </div>

      <div className="cards-section">
        {tickets.map((ticket: Ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            userData={userIdToData[ticket.userId]}
            hideStatusIcon={grouping === "status"}
            hideProfileIcon={grouping === "user"}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
