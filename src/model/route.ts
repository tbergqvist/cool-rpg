export interface Route<T> {
  component: (params: T) => JSX.Element;
  parameters: T;
}