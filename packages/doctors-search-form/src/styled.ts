/*
 *
 * Styled: `@exsys-clinio/doctors-search-form`.
 *
 */
import styled from "styled-components";
import { spacings } from "@exsys-clinio/theme-values";
import mediaQueries from "@exsys-clinio/media-queries";

export const DoctorsFormWrapper = styled.div`
  padding-block: ${spacings.sp3} 0px;
  display: grid;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 12px;
  width: 100%;
  > .organization-input,
  .specialty-input {
    grid-column: span 3 / auto;
  }

  > .period-input {
    grid-column: span 4 / auto;
  }

  > .search-button {
    grid-column: span 2 / auto;
  }

  ${mediaQueries.md`
  > .organization-input {
      grid-column: span 2 / auto;
    };
  > .specialty-input {
      grid-column: span 2 / auto;
    };
    > .period-input {
      grid-column: unset;
      width: ${spacings.sp29};
    }

    > .search-button {
      grid-column: unset;
    }
  `};
`;
