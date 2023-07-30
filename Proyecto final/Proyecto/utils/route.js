import { getUser } from "../components/GlobalState/GlobalState";
import {  Login, PrintMemoryPage, PrintPokemonPage, PrintQuizGame, PrintTopoPage, printTemplateDashboard,  } from "../pages";



export const initController = (pageRender) => {

    switch (pageRender) {
        case undefined:
            localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login()
            break;
        case "Login":
            Login();
            break;
        case "Dashboard":
            printTemplateDashboard();
            break;
        case "Pokemon":
            PrintPokemonPage();
            break;
        case "Memory":
            PrintMemoryPage();
            break;
        case "Quiz":
            PrintQuizGame();
            break;
        case "Topo":
            PrintTopoPage();
            break;
    }
}