import proj4 from "proj4";

export const transformCoordinates = (lat, lon, sourceCRS, targetCRS) => {
    // Define the coordinate transformation
    const transform = proj4(sourceCRS, targetCRS);
  
    // Perform the transformation
    const [x, y] = transform.forward([lon, lat]);
  
    // Return the transformed coordinates
    return { x, y };
  };
  