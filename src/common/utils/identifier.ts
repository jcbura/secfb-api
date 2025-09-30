export const isNumericId = (identifier: string): boolean => {
  const numericId = parseInt(identifier, 10);
  return !isNaN(numericId) && numericId.toString() === identifier;
};

export const parseIdentifier = (
  identifier: string,
): { id: number } | { slug: string } => {
  if (isNumericId(identifier)) {
    return { id: parseInt(identifier, 10) };
  }
  return { slug: identifier };
};
