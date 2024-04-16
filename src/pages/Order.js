import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useProducts } from "../components/ProductsContext";

const Order = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios
        .get(process.env.REACT_APP_SERVER_URL + "api/orders")
        .then((res) => {
          setItems(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div>
      <Container>
        <Content>
          <TitleDiv>
            <p style={{ fontSize: "50px", marginBottom: "10px" }}>주문</p>
            <div
              style={{
                borderBottom: "2px solid #000000",
                marginBottom: "10px",
              }}
            />
          </TitleDiv>
          <ItemsDiv>
            {items
              .slice()
              .reverse()
              .map((order) => (
                <Item key={order.id}>
                  <ItemInfo>
                    <ItemName>
                      <BoldText style={{ fontSize: "22px" }}>
                        {order.ordererName}
                      </BoldText>
                    </ItemName>
                    <ItemPrice>
                      <BoldText style={{ fontSize: "20px" }}>
                        총 {order.totalPrice}원
                      </BoldText>
                    </ItemPrice>
                    {order.orderedProducts.map((e) => (
                      <ItemPrice>
                        {e.name} - {e.amount}개
                      </ItemPrice>
                    ))}
                  </ItemInfo>
                  {!order.accepted ? (
                    <p>승인 대기중</p>
                  ) : (
                    <p style={{ color: "green" }}>결제 완료</p>
                  )}
                </Item>
              ))}
          </ItemsDiv>
        </Content>
      </Container>
    </div>
  );
};

export default Order;
const ItemsDiv = styled.div`
  margin-bottom: 200px;
`;
const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
const TitleDiv = styled.div`
  justify-content: flex-end;
  color: black;
  width: 1000px;
`;
const Item = styled.div`
  display: flex;
  background-color: #eeeeee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 7px;
  width: 1000px;
  align-items: center;
  justify-content: space-between;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  font-weight: bold;
`;

const ItemPrice = styled.div``;

const Content = styled.div`
  height: auto;
  min-height: 100%;
  padding-top: 150px;
`;

const Container = styled.div`
  min-height: calc(100vh - 300px);
  margin-top: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;

  > * {
    flex-shrink: 1;
  }
`;