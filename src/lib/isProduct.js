export function isProduct(product) {
  return (
    product !== null &&
    typeof product === "object" &&
    !Array.isArray(product) &&
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.category === "string" &&
    typeof product.description === "string" &&
    typeof product.image === "string" &&
    Number.isFinite(product.price) &&
    product.rating !== null &&
    typeof product.rating === "object" &&
    Number.isFinite(product.rating.rate) &&
    Number.isFinite(product.rating.count)
  );
}
