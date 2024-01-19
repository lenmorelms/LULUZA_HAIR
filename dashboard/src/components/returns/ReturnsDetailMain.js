import React, { useEffect } from "react";
import OrderDetailProducts from "../orders/OrderDetailProducts";
import OrderDetailInfo from "../orders/OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../Redux/Actions/OrderActions";
import { restoreOrder } from "../../Redux/Actions/ReturnsActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReturnsDetailmain = (props) => {
  const { orderReturnId, returnsId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;


  const returnsRestoreOrder = useSelector((state) => state.returnsRestoreOrder);
  const { loading: loadingRestored, success: successRestored } = returnsRestoreOrder;

  useEffect(() => {
    dispatch(getOrderDetails(orderReturnId));
  }, [dispatch, orderReturnId, successRestored]);

  const restoreOrderHandler = () => {
    dispatch(restoreOrder(returnsId));
  }

  const downloadOrder = (id) => {
    const input = document.getElementById('content_card');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`${id}.pdf`);
    });
  }

  return (
    <section className="content-main" id="content_main" style={{paddingLeft: '10%'}}>
      <div className="content-header">
        <Link to="/returns" className="btn btn-dark text-white">
          Back To Returns
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger"></Message>
      ) : (
        <div className="card col-lg-10" id="content_card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <button className="btn btn-success ms-2" onClick={()=>downloadOrder(order._id)}>
                  <i className="fas fa-print"></i>
                </button>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {/* {order.isDelivered ? (
                    <button className="btn btn-success col-12">
                      DELIVERED AT ({" "}
                      {moment(order.isDeliveredAt).format("MMM Do YY")})
                    </button>
                  ) : ( */}
                    <>
                      {loadingRestored && <Loading />}
                      <button
                        onClick={restoreOrderHandler}
                        className="btn btn-dark col-12"
                      >
                        RESTORE ORDER
                      </button>
                    </>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReturnsDetailmain;
