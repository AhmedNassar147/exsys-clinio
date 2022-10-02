/*
 *
 * Styled: `@exsys-clinio/app-client-logo`.
 *
 */
import styled from "styled-components";

export interface ClientLogoImgProps {
  width: string;
  height: string;
  marginStart?: string;
}

export const ClientLogoImg = styled.img<ClientLogoImgProps>`
  ${({ width, height, marginStart }) => `
    width: ${width};
    height: ${height};
    margin-inline-start: ${marginStart};
  `};
  object-fit: contain;
`;
