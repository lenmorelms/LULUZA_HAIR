import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Returns = (props) => {
  const { returns } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">OrderId</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {returns && returns.map((request) => (
          <tr key={request._id}>
            <td>
              <b>{request.orderId}</b>
            </td>
            <td>{request.action}</td>
            <td>{moment(request.createdAt).format("MMM Do YY")}</td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/returns/${request.orderId}?rid=${request._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Returns;
