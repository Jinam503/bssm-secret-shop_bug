import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useProducts } from "./ProductsContext";

const Product = () => {
  const { products, setProducts } = useProducts();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/products")
        .then((res) => {
          setItems(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const AddProductToCart = (item) => {
    console.log(item);
    const index = products.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      // 이미 장바구니에 있는 상품이라면 수량만 증가
      const updatedProducts = [...products];
      if (updatedProducts[index].amount < updatedProducts[index].maxStock) {
        updatedProducts[index].amount++;
        setProducts(updatedProducts);
      } else alert("재고가 부족하노..");
    } else {
      // 장바구니에 없는 상품이라면 새로 추가
      const newItem = {
        id: item.id,
        name: item.name,
        checked: true,
        category: item.category,
        description: item.description,
        url: item.imageUrl,
        price: item.price,
        amount: 1,
        maxStock: item.stock,
      };
      setProducts([...products, newItem]);
    }
  };

  return (
    <div>
      <Container>
        <Content>
          {items.map((item, index) => (
            <Item key={index}>
              <ItemImage src={item.imageUrl} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}원</ItemPrice>
              </ItemInfo>
              <ItemStock style={{ marginRight: "15px" }}>
                <LightText>남아있는 재고:&nbsp;</LightText>
                <BoldText style={{ fontSize: "18px" }}>{item.stock}</BoldText>
              </ItemStock>
              <AddToCartButton onClick={() => AddProductToCart(item)}>
                추가
              </AddToCartButton>
            </Item>
          ))}
        </Content>
      </Container>
    </div>
  );
};

export default Product;

const AddToCartButton = styled.button`
  width: 70px;
  height: 60px;
`;

const BoldText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
  font-weight: 1000;
`;
const LightText = styled.p`
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;
const ItemStock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 50px;
`;
const Item = styled.div`
  display: flex;
  background-color: #ececec;
  padding: 10px;
  margin: 10px;
  width: 600px;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100 px;
  margin-right: 10px;
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
