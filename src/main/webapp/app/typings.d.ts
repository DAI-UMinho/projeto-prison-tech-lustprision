declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.png';

declare module '*.jpg';

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
