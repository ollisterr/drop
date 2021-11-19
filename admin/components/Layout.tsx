import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: auto 1fr;

  height: 100vh;
  width: 100vw;
`;
