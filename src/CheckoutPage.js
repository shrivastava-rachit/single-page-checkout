import "../src/CheckoutPage.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import OrderSummary from "./components/OrderSummary";
import { rows } from "./data/tableData";

const CheckoutPage = () => {
  const [tableContent, setTableContent] = React.useState(rows);
  const [itemCount, setItemCount] = React.useState(0);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [enableElement, setEnableElement] = React.useState("");

  const calculateTotal = (id, operation) => {
    let selectedItem = tableContent.find((ele) => ele.productId === id);
    switch (operation) {
      case "add":
        selectedItem.quantity = selectedItem.quantity + 1;
        selectedItem.total = selectedItem.price * selectedItem.quantity;
        break;

      case "sub":
        selectedItem.quantity = selectedItem.quantity - 1;
        selectedItem.total = selectedItem.total - selectedItem.price;
        break;

      default:
        break;
    }
    setItemCount(getNumberOfItems(tableContent));
    setCartTotal(getAmount(tableContent));
    setTableContent([...tableContent]);
  };

  const getNumberOfItems = (data) => {
    let sum = 0;
    for (let i = 0; i <= data.length - 1; i++) {
      sum += data[i].quantity;
    }
    return sum;
  };

  const getAmount = (data) => {
    let sum = 0;
    for (let i = 0; i <= data.length - 1; i++) {
      sum += data[i].total;
    }
    return sum.toFixed(2);
  };

  const disableCartSection = () => {
    setEnableElement("none");
  };

  const enableCartSection = () => {
    setEnableElement("auto");
  };

  return (
    <>
      <div className="checkout-table-container-main">
        <div className="checkout-table-container">
          <h2 className="checkout-table-heading">
            <LocalMallRoundedIcon /> Cart
          </h2>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>PRODUCT DETAILS</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>QUANTITY</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>PRICE (per month)</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>TOTAL</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableContent.map((row) => (
                  <TableRow
                    key={row.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{
                        borderBottom: "none",
                      }}
                      align="center"
                    >
                      {row.productName}{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        pointerEvents: `${enableElement}`,
                        display: "flex",
                        alignItems: "center",
                        marginTop: "3px",
                        borderBottom: "none",
                      }}
                    >
                      <Button
                        disabled={row.quantity === 0}
                        onClick={() => calculateTotal(row.productId, "sub")}
                      >
                        -
                      </Button>
                      {row.quantity}
                      <Button
                        onClick={() => calculateTotal(row.productId, "add")}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                      }}
                      align="center"
                    >
                      ${row.price}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                      }}
                      align="center"
                    >
                      <b>${row.total.toFixed(2)}</b>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <OrderSummary
          style={{
            width: "30%",
            marginLeft: "30px",
          }}
          itemsInCart={itemCount}
          cartAmount={cartTotal}
          onDisableCartSection={disableCartSection}
          onEnableCartSection={enableCartSection}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
