import styled from "styled-components";

export const Main = styled.main`
  position: relative;
  padding: ${(p) => p.theme.spacing.xlarge};

  display: grid;

  gap: ${(p) => p.theme.spacing.large};

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.05;

    z-index: -1;
    background-image: url("/drops.webp");
    background-size: cover;
  }
`;
