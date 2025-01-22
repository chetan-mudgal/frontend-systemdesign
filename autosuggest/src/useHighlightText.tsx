export default function useHighlightText(value: string) {
  const highlightText = (text: string) => {
    const regex = new RegExp(`(${value})`, "gi");
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <strong key={index}>{part}</strong> : part
      );
  };
  return highlightText;
}
