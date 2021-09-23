export function combineClasses(...classes) {
  return classes.filter((currentClass) => typeof currentClass === "string").join(" ");
}
