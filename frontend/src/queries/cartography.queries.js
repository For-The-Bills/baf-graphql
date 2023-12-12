import { gql } from "@apollo/client";

export const GQL_GET_PARCEL_BY_COORDINATES = gql`
  query GetParcelByCoordinates($getParcelInput: GetParcelInput!) {
    getParcelByCoordinates(getParcelInput: $getParcelInput) {
      parcelNumber
      parcelRegion
      x
      y
    }
  }
`;

export const GQL_GET_PARCEL_SHAPE = gql`
  query GetParcelShape($getParcelShapeInput: GetParcelShapeInput!) {
    getParcelShape(getParcelShapeInput: $getParcelShapeInput) {
      coords
      polygon_center
      max_bounds
      parcelRegion
      parcelNumber
    }
  }
`;

export const GQL_GET_COORDINATES_BY_ADDRESS = gql`
  query GetCoordinatesByAddress(
    $getCoordsByAddressInput: GetCoordsByAddressInput!
  ) {
    getCoordinatesByAddress(getCoordsByAddressInput: $getCoordsByAddressInput) {
      x
      y
    }
  }
`;
