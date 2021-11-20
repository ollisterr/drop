import type { NextPage } from "next";
import styled from "styled-components";
import { MDBDataTableV5 } from "mdbreact";

import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { useGetApartmentGet } from "../api/default/default";
import { Card } from "../components/Card";

const Home: NextPage = () => {
  const { data } = useGetApartmentGet({ __page_size: 50 });

  console.debug(data);

  const columns = [
    {
      label: "Street name",
      field: "address",
      width: 200,
    },
    {
      label: "Amount of residents",
      field: "people",
      width: 200,
    },
  ];

  return (
    <Layout>
      <Main>
        <Card>
          <Title>sup bois</Title>
        </Card>

        <Card>
          <MDBDataTableV5 hover data={{ rows: data?.rows ?? [], columns }} />
        </Card>
      </Main>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 3rem;
`;

export default Home;
