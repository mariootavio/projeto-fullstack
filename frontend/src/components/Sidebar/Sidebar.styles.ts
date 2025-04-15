import styled from "styled-components";

export const Container = styled.aside`
  width: 220px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 2rem 1rem;
  height: 100vh;
  position: fixed;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    &.active {
      text-decoration: underline;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;
