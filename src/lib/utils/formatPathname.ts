export function formatPathname(url: string) {
  // Split the path by '/'
  const segments = url.split("/").slice(0);

  // Process each segment
  const newPathname = segments
    .map((segment) => {
      // Replace '-' with ' ' and split into words
      const words = segment.replace(/-/g, " ").split(" ");

      // Capitalize the first letter of each word
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    })
    .filter((segment) => segment.length > 0);

  return newPathname;
}
