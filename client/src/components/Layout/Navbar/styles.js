import styled from "styled-components";

export const NavbarWrapper = styled.div`
  height: 60px;
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
`;

export const NavbarContent = styled.div`
  margin: 0 auto;
  max-width: 1140px;
  display: flex;
  justify-content: space-between;
`;
