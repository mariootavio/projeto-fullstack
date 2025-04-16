import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryLighter: string;
      secondary: string;
      background: string;
      text: string;
    };
  }
}
