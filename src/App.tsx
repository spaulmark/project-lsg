import React from "react";
import { MainPage } from "./components/mainPage/mainPage";
import { MainPageController } from "./components/mainPage/mainPageController";
import { ThemeProvider } from "styled-components";
import { ColorTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/globalTheme";
import { theme$ } from "./subjects/subjects";
import { Subscription } from "rxjs";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

export const primary = "#33fff9";
export const secondary = "#f933ff";

const muiTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: primary },
    secondary: { main: secondary },
  },
});

class App extends React.Component<{}, { theme: ColorTheme }> {
  private sub: Subscription | null = null;
  public constructor(props: any) {
    super(props);
    this.state = {
      theme: darkTheme,
    };
  }

  public componentDidMount() {
    this.sub = theme$.subscribe((theme) => {
      this.setState({ theme });
    });
  }

  public componentWillUnmount() {
    if (this.sub) this.sub.unsubscribe();
  }

  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={this.state.theme}>
          <>
            <GlobalStyles />
            <MainPage controller={new MainPageController()} />
          </>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
