import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  padding: 0 1rem;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;

export const LogoImage = styled.img`
  max-width: 400px;
  width: 100%;
  margin-top: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;
