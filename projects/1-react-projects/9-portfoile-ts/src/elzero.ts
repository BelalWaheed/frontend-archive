let arr: (string | number | string[])[] = [
  "Elzero",
  16,
  "Osama",
  ["Ahmed", "Sayed"],
];

if (Array.isArray(arr[3])) {
  arr[3].map((name) => {
    console.log(`Hello ${name}, Welcome to TypeScript`);
  });
}
arr.push(100);

console.log(arr);
