/*
 *
 * Styled: `@exsys-clinio/app-client-logo`.
 *
 */
import styled from "styled-components";

export interface ClientLogoImgProps {
  className?: string;
}

export const ClientLogoImg = styled.img<ClientLogoImgProps>`
  object-fit: contain;
`;
