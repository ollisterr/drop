import styled from "styled-components";

export const Card = styled.div`
  border-radius: ${(p) => p.theme.spacing.medium};

  background-color: white;
  box-shadow: 0px 1px 24px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.05),
    0px 7px 15px rgba(0, 0, 0, 0.1);
`;
